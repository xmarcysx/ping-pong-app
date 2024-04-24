import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from './shared/menu/menu.component';
import { MainPageComponent } from './shared/main-page/main-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, ButtonModule, MenuComponent, MainPageComponent],
})
export class AppComponent {
  title = 'ping-pong-app';
}
