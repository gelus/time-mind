import {messages$} from '../message.util';
import * as userConfig from '../user-config';

declare var gapi: any;

export const ListUpcomingEventsDeclaration = {
  name: "ListUpcomingEvents",
  description: "Get a list of the next 10 upcomming Calendar events",
}

export const ListUpcomingEvents = async (): Promise<any> => {

  messages$.next('Getting Upcoming Events');

  try {
    const request = {
      //'calendarId': 'primary',
      'calendarId': userConfig.calendarId,
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
