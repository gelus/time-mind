import { Injectable, inject } from '@angular/core';
import {ReplaySubject, scan} from 'rxjs';
import {AuthService} from '../../../auth.service';

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class CalendarListService {

  private auth = inject(AuthService);
  public calendarList = new ReplaySubject(1);
  public calendarList$ = this.calendarList.pipe(
    scan((acc:any[], cur:any) => acc.concat(cur.result.items), [])
  );

  nextPageToken?: string;

  constructor() {
    this.requestMore();
  }


}
