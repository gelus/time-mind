import {messages$} from '../message.util';
import { PublicSettings } from "../application/settings/settings.service";
import {Schema} from "firebase/ai";

declare var gapi: any;

export const GetEventsByIdDeclaration = {
  name: "GetEventsById",
  description: "A general function to retreive events by id. tasks have their event ids saved on the ScheduleEventIds field",
  parameters: Schema.object({
    properties: {
      eventIds: Schema.array({
        "description": "an array of event ids to get",
        items:  Schema.string({
          "description": "A valid event Id"
        })
      })
    },
  }),
};

export const GetEventsById = async (
  {eventIds}: {eventIds:string[]}
) => {

  messages$.next('Checking Calendar');
  const userConfig =  PublicSettings.userSettings;

  try {
    const results = await Promise.all(eventIds.map((id => {
      const request = {
        'calendarId': userConfig?.calendar.id,
        'eventId': id,
      };
      return gapi.client.calendar.events.list(request);
    })));

    console.log('got events by Id', results);

    return {results};

  } catch (err: any) {
    return err;
  }

}

