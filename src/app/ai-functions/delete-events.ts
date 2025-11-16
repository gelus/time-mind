import {DocumentData, QuerySnapshot, arrayRemove, collection, getDocs, query, where, writeBatch} from "firebase/firestore";
import { PublicSettings } from "../application/settings/settings.service";
import {db} from '../firebase.config';
 import {messages$} from '../message.util';
import {Schema} from "firebase/ai";

declare const gapi: any;

export const DeleteEventsDeclaration = {
  name: 'DeleteEvents',
  description: 'Delete calendar events, removing them from the calendar by making a delete call for each passed in eventId, returns an array with empty bodies for successful deletion, or errors for those that failed',
  parameters: Schema.object({
    properties: {
      'eventIds': Schema.array({
        description: "An array of eventIds to be deleted",
        items: Schema.string({
          description: 'A single eventId'
        })
      })
    }
  })
}

export const DeleteEvents = async ({eventIds}: {eventIds: string[]}) => {
  messages$.next('Removing Calendar Events');
  const userConfig =  PublicSettings.userSettings;
  const batch = writeBatch(db);

  try {
    const ret = await Promise.all(eventIds.map(id => {
      const request = {
        'calendarId': userConfig?.calendar.id,
        'eventId': id,
      };
      console.log(request)

      const q = query(collection(db, 'tasks'), where('scheduledEventsIds', "array-contains", id));
      getDocs(q).then((querySnapshot: QuerySnapshot<DocumentData, DocumentData>) => {
        querySnapshot.forEach((doc) => {
          batch.update(doc.ref, {
            scheduledEventsIds: arrayRemove(id)
          });
        })
      });

      return gapi.client.calendar.events.delete(request);
    }));

    await batch.commit();

    console.log(ret);
    (window as any).toastr.success('Events have been removed');
    return {results: ret};

  } catch (err: any) {
    (window as any).toastr.error("Something Went Wrong");
    return err;
  }
}
