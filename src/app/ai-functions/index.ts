import {CreateEvents, CreateEventsDeclaration} from './create-event';
import {CreateUpdateTasks, CreateUpdateTasksDeclaration} from './create-update-tasks';
import {DeleteEvents, DeleteEventsDeclaration} from './delete-events';
import {DeleteTasks, DeleteTasksDeclaration} from './delete-tasks';
import {GetDateTime, GetDateTimeDeclaration} from './get-current-date-time';
import {GetEvents, GetEventsDeclaration} from './get-events';
import {GetEventsByText, GetEventsByTextDeclaration} from './get-events-by-text';
import {GetTasks, GetTasksDeclaration} from './get-tasks';
import {ListUpcomingEvents, ListUpcomingEventsDeclaration} from './list-upcoming-events';
import {UpdateEvents, UpdateEventsDeclaration} from  './update-events';

export const functions: any = {
  CreateEvents,
  CreateUpdateTasks,
  DeleteEvents,
  DeleteTasks,
  GetDateTime,
  GetEvents,
  GetEventsByText,
  GetTasks,
  ListUpcomingEvents,
  UpdateEvents,
};

export const functionDeclarations = [
  CreateEventsDeclaration,
  CreateUpdateTasksDeclaration,
  DeleteEventsDeclaration,
  DeleteTasksDeclaration,
  GetDateTimeDeclaration,
  GetEventsByTextDeclaration,
  GetEventsDeclaration,
  GetTasksDeclaration,
  ListUpcomingEventsDeclaration,
  UpdateEventsDeclaration,
];

