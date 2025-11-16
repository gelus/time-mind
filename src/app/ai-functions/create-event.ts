import { PublicSettings } from "../application/settings/settings.service";
import {Schema} from "firebase/ai";
import { eventSchema } from './schema.util';
import {messages$} from '../message.util';
import {arrayUnion, doc, writeBatch} from "firebase/firestore";
import {db} from "../firebase.config";

declare const gapi: any;

export const CreateEventsDeclaration = {
  name: 'CreateEvents',
  description: 'Create events on the calendar. Makes a live api calls for each event object passed in. Events should be associated with a task via the taskId field',
  parameters: Schema.object({
    properties: {
      "events": Schema.array({
        "description": "an array of events to be created.",
        items: eventSchema
      })
    }
  })
};

export const CreateEvents = async ({events}: {events: {summary:string, description:string, startData: any, endData: any, taskId: string}[]}) => {

  messages$.next('Creating Calendar Events');
  const messageArray: string[] = [];
  const userConfig =  PublicSettings.userSettings;
  const batch = writeBatch(db);

  try {
    const results = await Promise.all(events.map(({summary, description, startData, endData, taskId}) => {
      const start = {timeZone: userConfig?.calendar.timeZone, date: undefined, dateTime: undefined};
      const end = {timeZone: userConfig?.calendar.timeZone, date: undefined, dateTime: undefined};

      if (startData.date) start.date = startData.date;
      if (endData.date) end.date = endData.date;
      if (startData.dateTime) start.dateTime = startData.dateTime;
      if (endData.dateTime) end.dateTime = endData.dateTime;

      start.timeZone = userConfig?.calendar.timeZone;
      end.timeZone = userConfig?.calendar.timeZone;

      const request = {
        'calendarId': userConfig?.calendar.id,
        summary, description, end, start,
      };

      messageArray.push(summary);

      return gapi.client.calendar.events.insert(request).then((r: {result: {id: string}}) => {
        if (taskId) {
          const taskRef = doc(db, 'tasks', taskId);
          batch.set(taskRef, {
            scheduledEventsIds: arrayUnion(r.result.id)
          }, {merge: true});
        }
        return r;
      });
    }));

    console.log(results);
    await batch.commit();

    (window as any).toastr.success(messageArray.join('<br />'),'Events Created');
    return {results};


  } catch (err: any) {

    (window as any).toastr.error("Something Went Wrong...");
    return err;
  }

};
