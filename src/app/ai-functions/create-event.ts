import * as userConfig from '../user-config';
import {Schema} from "firebase/ai";

declare const gapi: any;

export const CreateEventDeclaration = {
  name: 'CreateEvent',
  description: 'Create an event on the calendar. Makes a live api call, please obtain user permission before executing.',
  parameters: Schema.object({
    properties: {
      "summary": Schema.string({
        "description": "The title of the event"
      }),
      "description": Schema.string({
        "description": "Description of the event. Can contain HTML. Be as detailed as you can."
      }),
      endData: Schema.object({
        "description": "The (exclusive) end time of the event. For a recurring event, this is the end time of the first instance.",
        properties: {
          date: Schema.string({
            "description": "The end date, in the format \"yyyy-mm-dd\", if this is an all-day event."
          }),
          dateTime: Schema.string({
            "description": "The end date and time, as a combined date-time value, must be specified valid ISO date time string, such as YYYY-MM-DDTHH:mm:ss.sssZ"
          })
        }
      }),
      startData: Schema.object({
        "description": "The (inclusive) start time of the event. For a recurring event, this is the start time of the first instance.",
        properties: {
          date: Schema.string({
            "description": "The start date, in the format \"yyyy-mm-dd\", if this is an all-day event."
          }),
          dateTime: Schema.string({
            "description": "The start date and time, as a combined date-time value, must be specified valid ISO date time string, such as YYYY-MM-DDTHH:mm:ss.sssZ"
          })
        }
      }),
    }
  })
};

export const CreateEvent = async ({summary, description, startData, endData}: any) => {

  console.log('Creating Event', startData, endData);

  const start = {timeZone: userConfig.timeZone, date: undefined, dateTime: undefined};
  const end = {timeZone: userConfig.timeZone, date: undefined, dateTime: undefined};

  if (startData.date) start.date = startData.date;
  if (endData.date) end.date = endData.date;
  if (startData.dateTime) start.dateTime = startData.dateTime;
  if (endData.dateTime) end.dateTime = endData.dateTime;

  start.timeZone = userConfig.timeZone;
  end.timeZone = userConfig.timeZone;

  console.log(summary, description, start, end);

  // must assign timeZone to the end and start

  try {
    const request = {
      'calendarId': userConfig.calendarId,
      summary,
      description,
      end,
      start,
    };

    return await gapi.client.calendar.events.insert(request);
  } catch (err: any) {
    return err;
  }
};
