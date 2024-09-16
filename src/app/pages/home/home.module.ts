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
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { AddpatientComponent } from './addpatient/addpatient.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ScheduledAppointmentComponent } from './scheduled-appointment/scheduled-appointment.component';
import { LeavesComponent } from './leaves/leaves.component';
import { HttpParams } from '@angular/common/http';

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
    LeavesComponent


  ],
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule,
    RouterModule.forChild(routes) 
    // NzNotificationService,
    
  ],
  providers: [MatDatepickerModule]
})
export class HomeModule { }
