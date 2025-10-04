import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import {ThemeService} from '../theme.service';
import {Router, RouterLink} from '@angular/router';
import {UserMenuComponent} from './user-menu/user-menu.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, UserMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected router = inject(Router);
  protected auth = inject(AuthService);
  protected themeService = inject(ThemeService);

}
