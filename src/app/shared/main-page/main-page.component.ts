import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  imports: [MenuComponent],
})
export class MainPageComponent {}
