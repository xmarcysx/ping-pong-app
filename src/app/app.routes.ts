import { Routes } from '@angular/router';
import { LoginComponent } from './modules/components/login/login.component';
import { MainPageComponent } from './shared/main-page/main-page.component';
import { RegistrationComponent } from './modules/components/registration/registration.component';
import { ForgotPassword } from './modules/components/forgot-password/forgot-password.component';
import { MatchesHistoryComponent } from './modules/components/matches-history/matches-history.component';
import { DashboardComponent } from './modules/components/dashboard/dashboard.component';
import { SettingsComponent } from './modules/components/settings/settings.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { RankingComponent } from './modules/components/ranking/ranking.component';
import { KingOfTheDayComponent } from './modules/components/king-of-the-day/king-of-the-day.component';
import { KingOfTheDayAddComponent } from './modules/components/king-of-the-day-add/king-of-the-day-add.component';
import { KingOfTheDayHistoryComponent } from './modules/components/king-of-the-day-history/king-of-the-day-history.component';

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
      {
        path: 'ranking',
        component: RankingComponent,
      },
      {
        path: 'krol-dnia',
        component: KingOfTheDayComponent,
      },
      {
        path: 'krol-dnia/utworz',
        component: KingOfTheDayAddComponent,
      },
      {
        path: 'krol-dnia/historia',
        component: KingOfTheDayHistoryComponent,
      },
    ],
  },
  { path: 'logowanie', component: LoginComponent },
  { path: 'rejestracja', component: RegistrationComponent },
  { path: 'przypomnij-hasło', component: ForgotPassword },
  { path: '**', redirectTo: 'dashboard' },
];
