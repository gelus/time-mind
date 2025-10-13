import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {ReplaySubject, scan} from 'rxjs';
import {AuthService} from '../../../auth.service';

declare var gapi: any;

export interface CalendarSubset {
  id: string;
  summary: string,
  timeZone: string,
  color: string,
}

@Component({
  selector: 'app-calendar-list',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './calendar-list.component.html',
  styleUrl: './calendar-list.component.scss'
})
export class CalendarListComponent {
  private auth = inject(AuthService);

  @Input() calendar!: CalendarSubset;
  @Input() accessRole?: string;
  @Output() calendarUpdated = new EventEmitter<CalendarSubset>();

  nextPageToken?: string;

  public calendarList = new ReplaySubject(1);
  public calendarList$ = this.calendarList.pipe(
    scan((acc:any[], cur:any) => acc.concat(cur.result.items), [])
  );

  constructor() {
    this.requestMore();
  }

  select(calendar: any) {
    this.calendar.id = calendar.id;
    this.calendar.summary = calendar.summary;
    this.calendar.timeZone = calendar.timeZone;
    this.calendar.color = calendar.backgroundColor;
    this.calendarUpdated.emit(this.calendar);
  }

  async requestMore() {

    await this.auth.gapiResolved;

    const request: any = {
      "maxResults": 100,
    };

    if (this.accessRole) request.minAccessRole = this.accessRole;
    if (this.nextPageToken) request.pageToken = this.nextPageToken;

    const data = await gapi.client.calendar.calendarList.list(request);

    this.nextPageToken = data.result.nextPageToken;
    this.calendarList.next(data);
  }
}
