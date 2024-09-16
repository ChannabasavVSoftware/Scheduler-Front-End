import { Component } from '@angular/core';

interface Appointment {
  AppointmentID: string;
  DoctorName: string;
  PatientName: string;
  AppointmentDate: Date;
  AppointmentTime:Date;
  AppointmentStatus:string;
}













@Component({
  selector: 'app-scheduled-appointment',
  templateUrl: './scheduled-appointment.component.html',
  styleUrl: './scheduled-appointment.component.less'
})
export class ScheduledAppointmentComponent {
  
  NowDate:Date=new Date();
  listOfData: Appointment[] = [
    {
      AppointmentID: "AID001",
      DoctorName: "Dr.Priya ",
      PatientName: "Patient One",
      AppointmentDate:this.NowDate ,
      AppointmentTime:this.NowDate,
      AppointmentStatus:"Scheduled"
    },
    {
      AppointmentID: "AID001",
      DoctorName: "Dr.Priya ",
      PatientName: "Patient One",
      AppointmentDate: this.NowDate,
      AppointmentTime:this.NowDate,
      AppointmentStatus:"Scheduled"
    },
    {
      AppointmentID: "AID001",
      DoctorName: "Dr.Priya ",
      PatientName: "Patient One",
      AppointmentDate: this.NowDate,
      AppointmentTime:this.NowDate,
      AppointmentStatus:"Scheduled"
    }
  ];






}
