import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from './shared/menu/menu.component';
import { MainPageComponent } from './shared/main-page/main-page.component';
import { ToastModule } from 'primeng/toast';
import { RacketAnimationComponent } from './shared/racket-animation/racket-animation.component';
import { SpinnerService } from './modules/services/spinner.service';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    ButtonModule,
    MenuComponent,
    MainPageComponent,
    ToastModule,
    RacketAnimationComponent,
  ],
})
export class AppComponent {
  spinnerService = inject(SpinnerService);
}
