import {messages$} from "../message.util";

export const GetDateTimeDeclaration = {
  name: 'GetDateTime',
  description: 'Get the current date and time for the user.'
};

export const GetDateTime = () => {
  messages$.next('Checking Date');
  return { date: new Date().toString() };
}


