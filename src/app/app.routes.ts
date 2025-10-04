import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {ApplicationComponent} from './application/application.component';
import {appAuthGuard} from './app-auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'app',
    component: ApplicationComponent,
    canActivate: [appAuthGuard]
  },
];
