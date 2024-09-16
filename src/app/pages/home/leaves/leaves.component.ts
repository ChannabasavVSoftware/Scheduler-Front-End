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
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.less'
})



export class LeavesComponent {

  time: Date | null = null;
  size: 'large' | 'small' | 'default' = 'default';
  log(value: Date): void {
    console.log(value);
  }


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
