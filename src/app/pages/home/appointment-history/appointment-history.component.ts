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
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrl: './appointment-history.component.less'
})
export class AppointmentHistoryComponent {

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
