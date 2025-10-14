import { Injectable, inject } from '@angular/core';
import {SettingsService, UserSettings} from './application/settings/settings.service';
import {take} from 'rxjs';

export declare type ThemeString = 'lightTheme' | 'darkTheme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  settingsService = inject(SettingsService);
  public selectedTheme?: string;

  private themes: Record<'lightTheme' | 'darkTheme', Record<string, string>> = {
    lightTheme: {
      'color-background':     '#F0F4FA',       // soft light blue-gray
      'color-surface':        '#FFFFFF',       // panels/cards
      'color-primary-text':   '#1E293B',       // dark slate gray
      'color-secondary-text': '#475569',       // medium gray
      'color-accent':         '#8B5CF6',       // bright purple accent for buttons/links
      'color-highlight':      '#363636',       // very dark text color
      'color-border':         '#CBD5E1',       // light border
      'color-overlay':        'rgba(0,0,0,0.65)',
      'color-hover':          '#A78BFA',       // brighter purple for hover
      'color-hover-tint':     '#000000',       // tint dark on the light theme
      'color-error':          '#EF4444',       // bright red
      'color-success':        '#22C55E',       // bright green
      'color-warning':        '#F59E0B',       // bright orange
      'color-info':           '#3B82F6',       // bright blue
      'color-muted':          '#F3F4F6',       // disabled / inactive
      'box-shadow':           '0px 1px 5px -4px #000'
    },
    darkTheme: {
      'color-background':     '#212728',       // dark slate
      'color-surface':        '#2b3335',       // cards/panels
      'color-primary-text':   '#F8FAFC',       // off-white text
      'color-secondary-text': '#DFDFDF',       // muted gray
      'color-accent':         '#8B5CF6',       // bright purple accent
      'color-highlight':      '#FFFFFF',       // pure white text
      'color-border':         '#475569',       // subtle border
      'color-overlay':        'rgba(255,255,255,0.65)',
      'color-hover':          '#7C3AED',       // brighter purple hover
      'color-hover-tint':     '#FFFFFF',       // tint light on the dark theme
      'color-error':          '#F87171',       // bright red
      'color-success':        '#4ADE80',       // bright green
      'color-warning':        '#FBBF24',       // bright orange
      'color-info':           '#60A5FA',       // bright blue
      'color-muted':          '#2D3748',       // disabled / inactive
      'box-shadow':           '0px 1px 1px 0px #000'
    }
  };

  constructor() {

    // apply the local theme or the dark theme as the default, then load the user settings and load if its different;
    const localTheme:ThemeString = localStorage.getItem('ui-theme') as ThemeString || 'lightTheme';
    this.applyTheme(localTheme);
    this.applyTheme(localTheme, false);

    this.settingsService.userSettings$.pipe(take(1)).subscribe((userSettings: UserSettings|null) => {
      if (userSettings?.theme && userSettings.theme !== this.selectedTheme) this.applyTheme(userSettings?.theme);
    });
  }

  applyTheme(themeName: ThemeString, save=true): void {
    const theme = this.themes[themeName];
    if (!theme) return;

    this.selectedTheme = themeName;
    if (save) {
      localStorage.setItem('ui-theme', themeName);
      this.settingsService.saveUserSettings({theme: themeName}, true);
    }

    const root = document.body;
    Object.entries(theme).forEach(([name, color]) => {
      root.style.setProperty(`--${name}`, color);
    });
  }
}
