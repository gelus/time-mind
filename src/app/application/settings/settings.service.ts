import { Injectable, inject } from '@angular/core';
import {AuthService} from '../../auth.service';
import {switchMap} from 'rxjs';
import {collection, doc, getDoc, setDoc} from 'firebase/firestore';
import {db} from '../../firebase.config';
import {CalendarSubset} from './calendar-list/calendar-list.component';
import {ThemeString} from '../../theme.service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

export class UserSettings {
  calendar: CalendarSubset = {
    id: '',
    summary: '',
    timeZone: '',
    color: '',
  };
  theme: ThemeString = 'lightTheme'
}

export let PublicSettings: {userSettings?:UserSettings|null} = {};

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  auth = inject(AuthService);

  userSettings$ = this.auth.user$.pipe(
    takeUntilDestroyed(),
    switchMap(async (user) => {
      if (user) {
        const userConfigRef = doc(db, "user-configs", user.uid);
        const userConfigSnap = await getDoc(userConfigRef);
        return (userConfigSnap.data() as UserSettings || new UserSettings());
      } else {
        return null;
      }
    }),
  );

  constructor() {
    this.userSettings$.subscribe((userSettings: UserSettings|null) => PublicSettings.userSettings = userSettings );
  }

  async saveUserSettings(userSettings: Partial<UserSettings>, supressPopup=false) {
    const configRef = collection(db, "user-configs");
    if (this.auth.user) {
      await setDoc(doc(configRef, this.auth.user.uid), structuredClone(userSettings), {merge: true});
      if(!supressPopup) (window as any).toastr.success('Settings Saved');
    }
  }

}
