import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { model } from './firebase.config';
import {FormsModule} from '@angular/forms';
import {GAuthService} from './g-auth.service';

declare var google: any;

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
    protected gAuth: GAuthService,
    //protected authService: AuthService
  ) {
    this.chat = model.startChat();
  }

  ngAfterViewInit() {
    this.gAuth.renderSignInButton(this.signInButton.nativeElement);
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
}
