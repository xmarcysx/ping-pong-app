import { Routes } from '@angular/router';
import { LoginComponent } from './modules/components/login/login.component';
import { MainPageComponent } from './shared/main-page/main-page.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
];
