import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface Appointment {
  AppointmentID: string;
  DoctorName: string;
  PatientName: string;
  AppointmentDate: Date;
  AppointmentTime: Date;
  AppointmentStatus: string;
}


@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrl: './appointment-history.component.less'
})
export class AppointmentHistoryComponent {
  AppointmentHistory: any;
  constructor(private _CommunicationService: CommunicationService, private _CommonService: CommonService,private notification:NzNotificationService) {

  }

  ngOnInit() {
    this.FetchUserDetails();
  }

  showNotification(title:string,message:string): void {
    this.notification
      .blank(
        title,
        message
      )
      .onClick.subscribe(() => {
        console.log('notification clicked!');
      });
  }

  FetchUserDetails() {

    this._CommunicationService.GetUserDetails(localStorage.getItem('username')).subscribe({
      next: (response: any) => {
        this._CommonService.PatientDetails = response.patient;
        const PatientId = localStorage.getItem('SelectedPatient');
        this._CommonService.SelectedPatient = response.patient.find(p => p.patientId == PatientId)
        this.GetPatientAppointmentHistory();
      }
    })
  }

  GetPatientAppointmentHistory() {
    this._CommunicationService.GetPatientAppointmentHistory(this._CommonService.SelectedPatient.patientId).subscribe({
      next: (response: any) => {
        console.log(response);

        this.AppointmentHistory = response;
      },
      error: (error: any) => {
        console.log("Error Occured : " + error);

      }
    })
  }

  CancelAppointment(Appointment){
    let TempAppointment = {...Appointment};
    delete TempAppointment.status;
    TempAppointment.status=2;

    this._CommunicationService.CancelAppointment(TempAppointment).subscribe({
      next:(response)=>{
        console.log(response);
        this.showNotification("Appointment cancelled sucessfully...","")
        this.GetPatientAppointmentHistory()
        // Appointment.status=2;
      },
      error:(error)=>{
        console.log("Error Occured : "+error);
        
      }
    })
  }










  NowDate: Date = new Date();
  listOfData: Appointment[] = [
    {
      AppointmentID: "AID001",
      DoctorName: "Dr.Priya ",
      PatientName: "Patient One",
      AppointmentDate: this.NowDate,
      AppointmentTime: this.NowDate,
      AppointmentStatus: "Scheduled"
    },
    {
      AppointmentID: "AID001",
      DoctorName: "Dr.Priya ",
      PatientName: "Patient One",
      AppointmentDate: this.NowDate,
      AppointmentTime: this.NowDate,
      AppointmentStatus: "Scheduled"
    },
    {
      AppointmentID: "AID001",
      DoctorName: "Dr.Priya ",
      PatientName: "Patient One",
      AppointmentDate: this.NowDate,
      AppointmentTime: this.NowDate,
      AppointmentStatus: "Scheduled"
    }
  ];

}
