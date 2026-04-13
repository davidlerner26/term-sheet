import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AuthComponent } from './components/auth/auth.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/auth');

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToHome,
    },
    canActivate: [AuthGuard],
  },
  { path: 'auth', component: AuthComponent },
];
