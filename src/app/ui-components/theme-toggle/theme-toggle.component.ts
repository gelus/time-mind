import { Component, inject } from '@angular/core';
import {ThemeService} from '../../theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {
  protected themeService = inject(ThemeService);
}
