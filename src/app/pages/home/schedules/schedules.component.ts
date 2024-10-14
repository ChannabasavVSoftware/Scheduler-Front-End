import { Component } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { DatePipe } from '@angular/common';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { setSeconds } from 'date-fns';
interface Appointment {
  AppointmentID: string;
  DoctorName: string;
  PatientName: string;
  AppointmentDate: Date;
  AppointmentTime: Date;
  AppointmentStatus: string;
}

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.less'
})

export class SchedulesComponent {

  constructor(private _CommunicationService: CommunicationService, private _datePipe: DatePipe, private notification: NzNotificationService) {

  }

  ngOnInit() {
    this.GetSchedules(1);
  }

  time: Date | null = null;
  size: 'large' | 'small' | 'default' = 'default';

  Days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  SelectedDay: string;
  StartTime: any;
  EndTime: any;
  DoctorSchedules: any;


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

  CreateNewSchedule() {
    let Day;

    switch (this.SelectedDay) {
      case 'Sunday': Day = 0; break;
      case 'Monday': Day = 1; break;
      case 'Tuesday': Day = 2; break;
      case 'Wednesday': Day = 3; break;
      case 'Thursday': Day = 4; break;
      case 'Friday': Day = 5; break;
      case 'Saturday': Day = 6; break;
    }

    this.StartTime=this.StartTime.setSeconds(0);
    this.EndTime=this.EndTime.setSeconds(0);

    const TempStartTime = this._datePipe.transform(this.StartTime, 'HH:mm:ss');
    const TempEndTime = this._datePipe.transform(this.EndTime, 'HH:mm:ss');

    const NewSchedule = {
      doctorId: 1,
      day: Day,
      startTime: TempStartTime,
      endTime: TempEndTime
    }

    console.log(NewSchedule);


    this._CommunicationService.CreateNewSchedule(NewSchedule).subscribe({
      next: (response : any) => {
        console.log(NewSchedule);
        console.log("Success...");
        console.log(response);
        
        this.showNotification("Schedule created successfully",`Start Time / End Time : ${response.startTime} / ${response.endTime}`)
        this.StartTime=null;
        this.EndTime=null;
        this.SelectedDay=null;
        this.GetSchedules(1)


      },
      error: (error) => {
        console.log(error.error);
        this.showNotification("Schedule creation failed",error.error);
        this.StartTime=null;
        this.EndTime=null;
        this.SelectedDay=null;
      }
    })

  }


  GetSchedules(DoctorId) {
    this._CommunicationService.GetSchedules(DoctorId).subscribe({
      next: (response) => {
        this.DoctorSchedules = response;
      },
      error: (error) => {

      }
    })
  }






  log(value: Date): void {
    console.log(value);
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
