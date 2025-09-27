import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { model } from './firebase.config';
import {FormsModule} from '@angular/forms';
import {AuthService} from './auth.service';

declare var gapi: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('signInButton') signInButton!: ElementRef;
  prompt = 'Write a story about a magic backpack.';
  responseText: string = '';
  chat;

  constructor (
    protected auth: AuthService,
  ) {
    this.chat = model.startChat();
  }

  async go() {

    console.log('click');
    try {
      const result = await this.chat.sendMessage(this.prompt);
      const response = result.response;
      this.responseText = response.text();
    } catch (e) {
      throw e;
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
}
