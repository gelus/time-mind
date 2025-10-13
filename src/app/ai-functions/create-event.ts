import { PublicSettings } from "../application/settings/settings.service";
import {Schema} from "firebase/ai";
import { eventSchema } from './schema.util';
import {messages$} from '../message.util';

declare const gapi: any;

export const CreateEventsDeclaration = {
  name: 'CreateEvents',
  description: 'Create events on the calendar. Makes a live api calls for each event object passed in.',
  parameters: Schema.object({
    properties: {
      "events": Schema.array({
        "description": "an array of events to be created.",
        items: eventSchema
      })
    }
  })
};

export const CreateEvents = async ({events}: {events: {summary:string, description:string, startData: any, endData: any}[]}) => {

  messages$.next('Creating Calendar Events');
  const messageArray: string[] = [];
  const userConfig =  PublicSettings.userSettings;

  try {
    const results = await Promise.all(events.map(({summary, description, startData, endData}) => {
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

      return gapi.client.calendar.events.insert(request);
    }));

    console.log(results);

    (window as any).toastr.success(messageArray.join('<br />'),'Events Created');
    return {results};


  } catch (err: any) {

    (window as any).toastr.error("Something Went Wrong...");
    return err;
  }

};
