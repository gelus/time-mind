import {CreateEvents, CreateEventsDeclaration} from './create-event';
import {DeleteEvents, DeleteEventsDeclaration} from './delete-events';
import {GetDateTime, GetDateTimeDeclaration} from './get-current-date-time';
import {GetEvents, GetEventsDeclaration} from './get-events';
import {GetTasks, GetTasksDeclaration} from './get-tasks';
import {ListUpcomingEvents, ListUpcomingEventsDeclaration} from './list-upcoming-events';
import {UpdateEvents, UpdateEventsDeclaration} from  './update-events';

export const functions: any = {
  CreateEvents,
  DeleteEvents,
  GetDateTime,
  GetEvents,
  GetTasks,
  ListUpcomingEvents,
  UpdateEvents,
};

export const functionDeclarations = [
  CreateEventsDeclaration,
  DeleteEventsDeclaration,
  GetDateTimeDeclaration,
  GetEventsDeclaration,
  GetTasksDeclaration,
  ListUpcomingEventsDeclaration,
  UpdateEventsDeclaration,
];

