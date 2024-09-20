import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../shared-module/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { ModalComponent } from 'src/app/sharedComponent/modal/modal.component';
import { TableComponent } from 'src/app/sharedComponent/table/table.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { AddpatientComponent } from './addpatient/addpatient.component';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ScheduledAppointmentComponent } from './scheduled-appointment/scheduled-appointment.component';
import { LeavesComponent } from './leaves/leaves.component';
import { LoginComponent } from './login/login.component';
import { UserProfilesComponent } from './user-profiles/user-profiles.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FullCalendarComponent } from 'src/app/full-calendar/full-calendar.component';

import {

  OnInit,
  Inject,
  LOCALE_ID,
  HostListener,
  ViewChild,
} from '@angular/core';



const routes: Routes = [
  { path: '', component: HomeComponent },
  // { matcher: CustomMatcher.customMatcher, component: JobDetailsComponent }
];

@NgModule({
  declarations: [
    HomeComponent,
    TableComponent,
    ModalComponent,
    BookAppointmentComponent,
    AddpatientComponent,
    AppointmentHistoryComponent,
    SchedulesComponent,
    ScheduledAppointmentComponent,
    LeavesComponent,
    LoginComponent,
    UserProfilesComponent,
    FullCalendarComponent
  
    
   
   
   
    
    
  ],
  

  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule, 
    MatIconModule,
    RouterModule.forChild(routes) ,
    MatProgressSpinnerModule,
    NzCardModule,NzBadgeModule,NzCalendarModule,
    FullCalendarModule
    
   
    
  ]
  
   
})
export class HomeModule { }


