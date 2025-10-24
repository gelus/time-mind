import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, inject, signal } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AiService} from '../../ai.service';
import {CommonModule} from '@angular/common';
import {EnhancedGenerateContentResponse, GenerateContentResult} from 'firebase/ai';
import {ScrollToDirective} from '../../scroll-to.directive';
import { messages$ } from '../../message.util';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, ScrollToDirective, MarkdownComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent {

  ngZone = inject(NgZone);
  changeDetector = inject(ChangeDetectorRef);

  loadingMessages$ = messages$

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

/// * Helper function/classes */
class Message {
  prompt: string;
  response?: EnhancedGenerateContentResponse;
  responseText = signal<string>('');

  constructor(prompt: string, resultPromise: Promise<GenerateContentResult>){
    this.prompt = prompt;
    resultPromise.then(result => {
      this.response = result.response;
      const text = this.response.text();
      const formatedText = text.trim().replace(/(\*|\d\.?) +/g, "$1 "); // strip out extra spaces from lsits
      this.responseText.set(formatedText);
    });
  }
}

