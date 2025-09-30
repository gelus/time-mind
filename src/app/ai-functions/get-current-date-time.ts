export const GetDateTimeDeclaration = {
  name: 'GetDateTime',
  description: 'Get the current date and time for the user.'
};

export const GetDateTime = () => {
  return { date: new Date().toString() };
}


