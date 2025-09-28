import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
import {AiService} from './ai.service';
import { functions } from './ai-functions';

declare var gapi: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('signInButton') signInButton!: ElementRef;
  prompt = 'Schedule an example call for today at 5, should only need an hour, (today is sep 28th 2025), makeup a nice title and description';
  responseText: string = '';
  chat;

  constructor (
    protected auth: AuthService,
    protected ai: AiService
  ) {
    this.chat = this.ai.model.startChat();
  }

  async go() {

    console.log('click');
    try {
      const result = await this.ai.sendChat(this.prompt);
      const response = result.response;
      this.responseText = response.text();
    } catch (e) {
      throw e;
    }

  }

  async testButtonFunction() {
    const minDate = new Date('November 9, 2025');
    const maxDate = new Date('November 13, 2025');
    const response = await functions.GetEvents({timeMin: minDate.toISOString(), timeMax: maxDate.toISOString()});

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
    console.log(response)
  }
}
