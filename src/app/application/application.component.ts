import { Component } from '@angular/core';
import {ChatComponent} from './chat/chat.component';
import {CalendarComponent} from './calendar/calendar.component';
import {WaveComponent} from '../ui-components/wave/wave.component';

@Component({
  selector: 'app-application',
  imports: [ChatComponent, CalendarComponent, WaveComponent],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent {}
