
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { environment } from 'src/environments/environment.development';
import { BookAppointmentComponent } from './pages/home/book-appointment/book-appointment.component';
import {AddpatientComponent} from './pages/home/addpatient/addpatient.component';
import { AppointmentHistoryComponent } from './pages/home/appointment-history/appointment-history.component';
import { SchedulesComponent } from './pages/home/schedules/schedules.component';
import { ScheduledAppointmentComponent } from './pages/home/scheduled-appointment/scheduled-appointment.component';
import { LeavesComponent } from './pages/home/leaves/leaves.component';
import { LoginComponent } from './pages/home/login/login.component';
import { UserProfilesComponent } from './pages/home/user-profiles/user-profiles.component';
import { AuthGuard } from './services/auth.guard';
import { FullCalendarComponent } from './full-calendar/full-calendar.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', canActivate: [OktaAuthGuard], loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  
];

const skipauthRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  { path: 'bookappointment', component: BookAppointmentComponent,canActivate: [AuthGuard] },
  { path:'addpatient',component:AddpatientComponent},
  { path:'appointmenthistory',component:AppointmentHistoryComponent},
  {path:'schedules',component:SchedulesComponent},
  {path:'scheduledappointment',component:ScheduledAppointmentComponent},
  {path:'leaves',component:LeavesComponent},
  {path:'login',component:LoginComponent},
  {path:'userprofiles',component:UserProfilesComponent},
  {path:'fullcalendar',component:FullCalendarComponent}
  
];


@NgModule({
  imports: [RouterModule.forRoot(environment.userAuthentication ? routes : skipauthRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
