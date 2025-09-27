import { Injectable } from '@angular/core';
import {Auth, GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithCredential, signInWithPopup} from 'firebase/auth';

declare var google: any;
declare var gapi: any;

const CLIENT_ID = '569152050883-skmhpfhv8srkk6jjqaf4q2s99muvqvqk.apps.googleusercontent.com';
const API_KEY = 'AIzaSyB9pymyl1sCOAzP8wRvd8XvnPR2_XZfnMs';

const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar';

@Injectable({
  providedIn: 'root'
})
export class GAuthService {
  auth: Auth;
  authClient: any;
  tokenClient: any;
  id_token?: string;
  access_token?: string;
  user?: User;
  provider: any;

  constructor() {

    this.auth = getAuth();

    this.provider = new GoogleAuthProvider();
    this.provider.addScope(SCOPES);

    onAuthStateChanged(this.auth, this.onAuthStateChangedHandle)

    // init gapi
    gapi.load('client', async () => {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      });
    });

    this.authClient = google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: this.handleCredentialResponse
    });

    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: this.handleAccessTokenResponse
    });

  }

  private handleCredentialResponse = (resp: any) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    this.id_token = resp.credential;
    //this.tokenClient.requestAccessToken({prompt: 'consent'});
    this.tokenClient.requestAccessToken({prompt: ''});
  }

  private handleAccessTokenResponse = async (resp: any) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    this.access_token = resp.access_token;
    console.log('Google auth flow complete, authenticating with fire base');
    this.listUpcomingEvents();

    const credential = GoogleAuthProvider.credential(this.id_token, this.access_token);
    const userCredentials = await signInWithCredential(this.auth, credential)
    console.log('Login complete', this.user);
  }

  public renderSignInButton(element: HTMLElement) {
    google.accounts.id.renderButton( element, { theme: "outline", size: "large" } );
  }

  onAuthStateChangedHandle = async (user: any) => {
    console.log('Auth State Change');
    if (user) {
      console.log('user logged in');
      (window as any).t = {
        tokenClient: this.tokenClient,
        authClient: this.authClient,
        user,
      }
      this.user = user;
    } else {
      console.log('User Not signed in');
      // Redirect to log in page?
    }
  }

  async listUpcomingEvents() {
    let response;
    try {
      const request = {
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime',
      };
      response = await gapi.client.calendar.events.list(request);
    } catch (err: any) {
      (document.getElementById('content') as any).innerText = err.message;
      return;
    }

    const events = response.result.items;
    if (!events || events.length == 0) {
      (document.getElementById('content') as any).innerText = 'No events found.';
      return;
    }
    // Flatten to string to display
    const output = events.reduce(
      (str: any, event: {summary: any; start: {dateTime: any; date: any;};}) => `${str}${event.summary} (${event.start.dateTime || event.start.date})\n`,
      'Events:\n');
    (document.getElementById('content') as any).innerText = output;
  }

  firebaseFlow() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      console.log(result);
      console.log(credential);
      console.log(accessToken);
      gapi.client.setToken({access_token: accessToken})
    })
  }

}
