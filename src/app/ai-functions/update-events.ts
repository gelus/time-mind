import { PublicSettings } from "../application/settings/settings.service";
import {Schema} from "firebase/ai";
import {eventSchemaWithId} from './schema.util';
import {messages$} from '../message.util';

declare const gapi: any;

export const UpdateEventsDeclaration = {
  name: 'UpdateEvents',
  description: 'Update Existing Events by array, The entire event object must be provided for every updated event.',
  parameters: Schema.object({
    properties: {
      'events': Schema.array({
        description: 'An array of complete event objects with their updated values, Unchanged values must be passed in as they are.',
        items: eventSchemaWithId
      })
    }
  })
};

export const UpdateEvents = async ({events}: {events: {summary:string, description:string, startData: any, endData: any, eventId: string}[]}) => {
  messages$.next('Updating Calendar Events');
  const messageArray: string[] = [];

  const userConfig =  PublicSettings.userSettings;

  try {
    const results = await Promise.all(events.map(({summary, description, startData, endData, eventId}) => {
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
        eventId, summary, description, end, start,
      };

      messageArray.push(summary);
      return gapi.client.calendar.events.update(request);
    }));

    console.log(results);

    (window as any).toastr.success(messageArray.join('<br />'),'Events Updated');
    return {results};


  } catch (err: any) {
    (window as any).toastr.error("Something Went Wrong");
    return err;
  }
}
