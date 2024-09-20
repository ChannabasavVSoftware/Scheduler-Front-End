import { Component, ViewEncapsulation } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { CommonService } from 'src/app/services/common.service';

interface Appointment {
  AppointmentID: string;
  DoctorName: string;
  PatientName: string;
  AppointmentDate: Date;
  AppointmentTime: Date;
  AppointmentStatus: string;
}



@Component({
  selector: 'app-scheduled-appointment',
  templateUrl: './scheduled-appointment.component.html',
  styleUrl: './scheduled-appointment.component.less',
  encapsulation: ViewEncapsulation.None

})
export class ScheduledAppointmentComponent {

  AppointmentHistory: any;
  listDataMap: { [key: number]: any[] } = {};
  listOfData: any;

  constructor(private _CommunicationService: CommunicationService, private _CommonService: CommonService) {

  }

  ngOnInit() {
    this.GetDoctorAppointmentHistory("1");
  }

  GetDoctorAppointmentHistory(DoctorId: any) {
    this._CommunicationService.GetDoctorAppointmentHistory(DoctorId).subscribe({
      next: (response: any) => {
        this.AppointmentHistory = response;
        console.log(this.AppointmentHistory);
        this.processAppointments();
        this.listOfData = response;
      },
      error: (response: any) => {

      }
    })
  }

  processAppointments() {
    this.AppointmentHistory.forEach(appointment => {
      const date = new Date(appointment.appointmentDate);
      const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

      const statusMap = {
        0: 'success',
        1: 'warning',
        2: 'error'
      };

      const event = {
        type: statusMap[appointment.status] || 'default',
        content: `Appointment at ${appointment.appointmentTime}`
      };

      if (!this.listDataMap[day]) {
        this.listDataMap[day] = [];
      }
      this.listDataMap[day].push(event);
    });

    console.log(this.listDataMap);
  }

  getEventsForDate(date: Date): any[] {
    const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return this.listDataMap[dayKey] || [];
  }

  getMonthData(month: Date): string {
    return `Month: ${month.getMonth() + 1}`;
  }

  CancelAppointment(Appointment) {
    let TempAppointment = {...Appointment};
    delete TempAppointment.patientName;
    TempAppointment.status=2;
    
    console.log("Temp Appointment");
    console.log(TempAppointment);

    console.log("Appointment");
    console.log(Appointment);
    
    
    






    this._CommunicationService.CancelAppointment(TempAppointment).subscribe({
      next: (response) => {
        console.log("Message deleted successfully...");
        console.log(response);
        



        Appointment.status=2;
        
      },
      error: (error) => {
        console.log("Error occurred : " + error);
      }
    })
  }





}
