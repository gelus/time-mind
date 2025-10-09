import { Component } from '@angular/core';
import {ChatComponent} from './chat/chat.component';
import {CalendarComponent} from './calendar/calendar.component';
import {WaveComponent} from '../ui-components/wave/wave.component';
import {TasksComponent} from './tasks/tasks.component';
import {CommonModule} from '@angular/common';

type PaneName = 'tasks'|'calendar'|'none';

@Component({
  selector: 'app-application',
  imports: [CommonModule, ChatComponent, CalendarComponent, TasksComponent, WaveComponent, ],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent {
  pane: PaneName = 'none';

  togglePane(pane:PaneName = 'none') {
    if (this.pane === pane) this.pane = 'none';
    else this.pane = pane;
  }
}
