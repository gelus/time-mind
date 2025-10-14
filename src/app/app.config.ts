import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideMarkdown } from 'ngx-markdown';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      timeOut: 10000,
      resetTimeoutOnDuplicate: true,
      includeTitleDuplicates: true,
      enableHtml: true,
      progressBar: true,
      newestOnTop: false,
      progressAnimation: 'decreasing',
      toastClass: 'ngx-toastr time-mind-toast',
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    provideMarkdown(),
  ]
};
