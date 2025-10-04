import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AiService} from '../../ai.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule,],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  prompt = 'Prompt here.';
  responseText: string = '';
  chat;

  constructor (
    protected ai: AiService,
  ) {
    this.chat = this.ai.model.startChat();
  }

  handlekeyup(e: KeyboardEvent) {
    if (e.code === 'Enter' && e.shiftKey === true) {
      this.go();
      this.prompt = '';
    }
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

}
