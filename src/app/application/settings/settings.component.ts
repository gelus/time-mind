import { Component, inject } from '@angular/core';
import {WaveComponent} from '../../ui-components/wave/wave.component';
import {CalendarListComponent} from './calendar-list/calendar-list.component';
import {SettingsService} from './settings.service';
import {AsyncPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ThemeToggleComponent} from '../../ui-components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-settings',
  imports: [AsyncPipe, WaveComponent, CalendarListComponent, FormsModule, ThemeToggleComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  settingsService = inject(SettingsService);
}
