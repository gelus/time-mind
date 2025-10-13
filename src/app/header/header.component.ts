import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import {ActivatedRoute, NavigationEnd, Router, RouterLink} from '@angular/router';
import {UserMenuComponent} from './user-menu/user-menu.component';
import { ToastrService } from 'ngx-toastr';
import {AsyncPipe} from '@angular/common';
import {Observable, filter, map, tap} from 'rxjs';
import {ThemeToggleComponent} from '../ui-components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe, UserMenuComponent, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  protected auth = inject(AuthService);
  protected toastr = inject(ToastrService);

  // Create an observable property for the route data
  // Use a pipe and map to select the specific data properties if needed
  //public routeData$: Observable<{ back: string, title: string }> = this.router.events.pipe(
  public routeData$: Observable<any> = this.router.events.pipe(
     filter((e): e is NavigationEnd => e instanceof NavigationEnd),
     map(() => this.route?.root?.firstChild?.snapshot.data),
     tap(() => {document.scrollingElement?.scrollTo(0,0)})
  );

  constructor(){
    (window as any).toastr = this.toastr;
  }

}
