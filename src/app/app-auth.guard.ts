import { CanActivateFn, RedirectCommand, Router } from '@angular/router';
import {AuthService} from './auth.service';
import {inject} from '@angular/core';

export const appAuthGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.user) return true;

  await auth.firebaseFlow();

  if (auth.user) return true;

  const landingPath = router.parseUrl("/");
  return new RedirectCommand(landingPath);
};
