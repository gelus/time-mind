import {Schema} from "firebase/ai";

export const taskSchema = Schema.object({
  properties: {
    "id": Schema.string({
      "description": "UUID to uniqly identify the task, only provide if you have an id, otherwise leave off this field to create a new task."
    }),
    "summary": Schema.string({
      "description": "The title of the task."
    }),
    "description": Schema.string({
      "description": "The Description of the event, be as detailed as you can."
    }),
    "complete": Schema.boolean({
      "description": "mark true if the task has been completed, set to false if there is still work to be done."
    }),
    "timeEstimate": Schema.number({
      "description": "An estimate in Hours, for how long this task will take to complete, decimals are acceptable."
    }),
    "timeCompleted": Schema.number({
      "description": "time in Hours spent on this task. Can be logged to show progress."
    }),
  },
  optionalProperties: ["id", "description", "timeEstimate"],
});

export const eventSchema = Schema.object({
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
});

export const eventSchemaWithId = Schema.object({
  properties: {
    "eventId": Schema.string({
      description: "The event ID to be updated"
    }),
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
});
