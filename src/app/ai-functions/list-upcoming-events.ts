import {messages$} from '../message.util';
import { PublicSettings } from "../application/settings/settings.service";

declare var gapi: any;

export const ListUpcomingEventsDeclaration = {
  name: "ListUpcomingEvents",
  description: "Get a list of the next 10 upcomming Calendar events",
}

export const ListUpcomingEvents = async (): Promise<any> => {

  messages$.next('Getting Upcoming Events');

  const userConfig =  PublicSettings.userSettings;

  try {
    const request = {
      'calendarId': userConfig?.calendar.id,
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime',
    };
    return await gapi.client.calendar.events.list(request);
  } catch (err: any) {
    return err;
  }

};
