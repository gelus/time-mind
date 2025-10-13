import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {ApplicationComponent} from './application/application.component';
import {appAuthGuard} from './app-auth.guard';
import {SettingsComponent} from './application/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    data: {'link': 'app'}
  },
  {
    path: 'app',
    component: ApplicationComponent,
    canActivate: [appAuthGuard],
    data: {'link': '/'}
  },
  {
    path: 'app/settings',
    component: SettingsComponent,
    canActivate: [appAuthGuard],
    data: {'back': 'app', 'title': 'Settings'}
  }
];
