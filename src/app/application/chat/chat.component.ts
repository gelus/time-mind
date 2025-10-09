import { Component, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AiService} from '../../ai.service';
import {CommonModule} from '@angular/common';
import {EnhancedGenerateContentResponse, GenerateContentResult} from 'firebase/ai';
import {ScrollToDirective} from '../../scroll-to.directive';

class Message {
  prompt: string;
  response?: EnhancedGenerateContentResponse;
  responseText = signal<string>('');

  constructor(prompt: string, resultPromise: Promise<GenerateContentResult>){
    this.prompt = prompt;
    resultPromise.then(result => {
      this.response = result.response;
      this.responseText.set(this.response.text());
    });
  }
}

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, ScrollToDirective],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {

  messages: Message[] = [];
  prompt = '';
  responseText: string = '';
  chat;

  constructor (
    protected ai: AiService,
  ) {
    this.chat = this.ai.model.startChat();
  }

  handlekeyup(e: KeyboardEvent) {
    if (e.code === 'Enter' && e.shiftKey !== true) {
      this.go();
    }
  }

  async go() {

    try {
      this.messages.push(new Message(this.prompt, this.ai.sendChat(this.prompt)))
      this.prompt = '';
    } catch (e) {
      throw e;
    }

  }

}
