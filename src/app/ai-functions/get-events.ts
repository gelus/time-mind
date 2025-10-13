import {messages$} from '../message.util';
import { PublicSettings } from "../application/settings/settings.service";
import {Schema} from "firebase/ai";

declare var gapi: any;

export const GetEventsDeclaration = {
  name: "GetEvents",
  description: "A general function to retreive events by date.",
  parameters: Schema.object({
    properties: {
      timeMin: Schema.string({
        description: "The Minimum date and time to find events, must be smaller than timeMax and must be specified valid ISO date time string, such as YYYY-MM-DDTHH:mm:ss.sssZ",
      }),
      timeMax: Schema.string({
        description: "The Maximum date and time to find events, must be larger than timeMin and must be specified valid ISO date time string, such as YYYY-MM-DDTHH:mm:ss.sssZ",
      }),
    },
  }),
};

export const GetEvents = async (
  {timeMin, timeMax}: {timeMin:string;timeMax:string}
) => {

  messages$.next('Checking Calendar');
  const userConfig =  PublicSettings.userSettings;

  try {
    const request = {
      'calendarId': userConfig?.calendar.id,
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 100,
      'orderBy': 'startTime',
      timeMin,
      timeMax
    };

    return await gapi.client.calendar.events.list(request);
  } catch (err: any) {
    return err;
  }

}

