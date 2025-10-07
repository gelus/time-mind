import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import {ThemeService} from '../theme.service';
import {Router, RouterLink} from '@angular/router';
import {UserMenuComponent} from './user-menu/user-menu.component';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, UserMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected router = inject(Router);
  protected auth = inject(AuthService);
  protected toastr = inject(ToastrService);
  protected themeService = inject(ThemeService);

  constructor(){
    (window as any).toastr = this.toastr;
  }

}
