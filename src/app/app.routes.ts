import { Routes } from '@angular/router';
import { LoginComponent } from './modules/components/login/login.component';
import { MainPageComponent } from './shared/main-page/main-page.component';
import { RegistrationComponent } from './modules/components/registration/registration.component';
import { ForgotPassword } from './modules/components/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'logowanie', component: LoginComponent },
  { path: 'rejestracja', component: RegistrationComponent },
  { path: 'przypomnij-hasło', component: ForgotPassword },
];
