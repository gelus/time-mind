import {GetEvents, GetEventsDeclaration} from './get-events';
import {CreateEvent, CreateEventDeclaration} from './create-event';
import {ListUpcomingEvents, ListUpcomingEventsDeclaration} from './list-upcoming-events';

export const functions: any = {
  GetEvents,
  CreateEvent,
  ListUpcomingEvents
};

export const functionDeclarations = [
  GetEventsDeclaration,
  CreateEventDeclaration,
  ListUpcomingEventsDeclaration
];

