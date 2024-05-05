import { Routes } from '@angular/router';
import { LoginComponent } from './modules/components/login/login.component';
import { MainPageComponent } from './shared/main-page/main-page.component';
import { RegistrationComponent } from './modules/components/registration/registration.component';
import { ForgotPassword } from './modules/components/forgot-password/forgot-password.component';
import { MatchesHistoryComponent } from './modules/components/matches-history/matches-history.component';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';
import { SettingsComponent } from './modules/components/settings/settings.component';
import { AuthGuard } from './modules/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'historia-spotkań',
        component: MatchesHistoryComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'ustawienia',
        component: SettingsComponent,
      },
    ],
  },
  { path: 'logowanie', component: LoginComponent },
  { path: 'rejestracja', component: RegistrationComponent },
  { path: 'przypomnij-hasło', component: ForgotPassword },
  { path: '**', redirectTo: 'dashboard' },
];
