import {messages$} from '../message.util';
import { PublicSettings } from "../application/settings/settings.service";
import {Schema} from "firebase/ai";

declare var gapi: any;

export const GetEventsByTextDeclaration = {
  name: "GetEventsByText",
  description: "A general function to retreive events by matching text.",
  parameters: Schema.object({
    properties: {
      q: Schema.string({
        description: `The query, use keywords separated by spaces. For an exact phrase, enclose it in double quotes. The API performs a free-text search across event fields like summary and description. For example, 'Meeting Project X' searches for events containing both "Meeting" and "Project X".`,
      }),
    },
  }),
};

export const GetEventsByText = async (
  {q}: {q:string}
) => {

  messages$.next(`Checking Calendar for "${q}"`);
  const userConfig =  PublicSettings.userSettings;

  try {
    const request = {
      'calendarId': userConfig?.calendar.id,
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 100,
      'orderBy': 'startTime',
      'timeMin': (new Date()).toISOString(),
      q
    };

    return await gapi.client.calendar.events.list(request);
  } catch (err: any) {
    return err;
  }

}

