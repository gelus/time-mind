import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';
import {switchMap, take} from 'rxjs';
import {User} from 'firebase/auth';

export const appAuthGuard: CanActivateFn = (/*route, state*/) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1),
    switchMap(async (user: User|null) => {
      if (user && auth.getAccessTokenFromStorage()) return true;

      await auth.firebaseFlow()
      if (user && auth.getAccessTokenFromStorage()) return true;

      const landingPath = router.parseUrl("/");
      return new RedirectCommand(landingPath);
    })
  )

};
