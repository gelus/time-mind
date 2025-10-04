import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-menu',
  imports: [],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.scss'
})
export class UserMenuComponent {
  protected auth = inject(AuthService);
  protected router = inject(Router);
  @ViewChild('userMenuElm') userMenuElm!: ElementRef;

  abortControl?: AbortController;

  toggleMenu() {
    if (this.abortControl) this.tearDownMenu();
    else this.setupMenu()
  }

  setupMenu() {
    this.abortControl = new AbortController();
    window.addEventListener('mousedown', (e: Event) => {
      if (!this.userMenuElm.nativeElement.contains(e.target)){
        this.tearDownMenu();
      }
    }, {signal: this.abortControl.signal});
  }

  tearDownMenu() {
    if (this.abortControl) {
      this.abortControl.abort();
      delete this.abortControl;
    }
  }

  async signOut() {
    this.auth.signOut();
    this.tearDownMenu();
    this.router.navigate(['/']);
  }
}
