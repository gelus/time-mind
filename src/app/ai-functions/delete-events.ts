import * as userConfig from '../user-config';
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
  console.log('delete events', eventIds)
  try {
    const ret = await Promise.all(eventIds.map(id => {
      const request = {
        'calendarId': userConfig.calendarId,
        'eventId': id,
      };
      console.log(request)
      return gapi.client.calendar.events.delete(request);
    }))

    console.log(ret);

    return {results: ret};

  } catch (err: any) {
    return err;
  }
}
