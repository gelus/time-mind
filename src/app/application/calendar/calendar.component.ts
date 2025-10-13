import {Component, computed, inject, signal} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {SettingsService, UserSettings} from '../settings/settings.service';
import {CalendarSubset} from '../settings/calendar-list/calendar-list.component';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-calendar',
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  private sanitizer = inject(DomSanitizer);
  private settingsService = inject(SettingsService);

  calendar = signal<CalendarSubset|null>(null);
  calendarUrl = computed(() => !this.calendar() ? '' : this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://calendar.google.com/calendar/embed?height=600&wkst=1&showPrint=0&showTitle=0&showTz=0&mode=AGENDA&` +
    `src=${this.calendar()?.id}` +
    `&color=${encodeURIComponent(this.calendar()?.color as string)}`
  ))

  constructor() {
    this.settingsService.userSettings$.pipe(takeUntilDestroyed()).subscribe((userSettings: UserSettings|null) => {
      if (userSettings?.calendar) this.calendar.set(userSettings.calendar);
    })
  }
}
