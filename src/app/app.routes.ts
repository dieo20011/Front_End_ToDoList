import { Routes } from '@angular/router';
import { MainLayoutComponent } from './feature/main-layout/main-layout.component';
import { LoginComponent } from './feature/login/login.component';
import { SignUpComponent } from './feature/sign-up/sign-up.component';
import { AuthGuard } from '../core/guard/auth.guard';
import { GuestGuard } from '../core/guard/guest.guard';
import { HolidayComponent } from './feature/holiday/holiday.component';
import { CalendarViewComponent } from './feature/calendar-view/calendar-view.component';
import { NewsComponent } from './feature/news/news.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    children:[
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'calendar-self',
      },
      {
        path: 'calendar-self',
        component: CalendarViewComponent
      },
      {
        path: 'holiday',
        component: HolidayComponent
      },
      {
        path: 'news',
        component: NewsComponent
      },
    ]
  },
  {
    path: 'login',
    canActivate: [GuestGuard],
    component: LoginComponent,
  },
  {
    path: 'sign-up',
    canActivate: [GuestGuard],
    component: SignUpComponent,
  },
];
