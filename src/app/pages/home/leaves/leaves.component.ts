import { DatePipe, formatDate, Time } from '@angular/common';
import { Component } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

interface Appointment {
  AppointmentID: string;
  DoctorName: string;
  PatientName: string;
  AppointmentDate: Date;
  AppointmentTime: Date;
  AppointmentStatus: string;
}
@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.less'
})



export class LeavesComponent {

  constructor(private _CS: CommunicationService, private datePipe: DatePipe) {
    this.updateTable();
  }


  listOfLeave: any;
  dcotorId: number = 1;  // for now it is hardcoded later we have to align with login in docterid.

  startDate: Date;
  endDate: Date;
  startTime: string = "0000-00-00T00:00:00";
  endTime: string = "0000-00-00T00:00:00";
  leaveType: number;
  description: string;
  dateRange: Date[] = [];

  // Tue Sep 17 2024 00:00:33 GMT+0530 (India Standard Time)

  time: Date | null = null;
  size: 'large' | 'small' | 'default' = 'default';
  log(value: Date): void {
    console.log(value);
  }

  addLeave(): void {
    console.log("Start Timee : " + this.startTime);

    // Format dates for backend
    const formattedStartDate = this.datePipe.transform(this.startDate, 'yyyy-MM-dd');
    const formattedEndDate = this.datePipe.transform(this.endDate, 'yyyy-MM-dd');
    const formattedStartTime = this.datePipe.transform(this.startTime, 'HH:mm:ss');
    const formattedEndTime = this.datePipe.transform(this.endTime, 'HH:mm:ss');

    console.log("dateee : " + formattedStartTime);

    const leave = {
      leaveId: 0,
      doctorId: 1,
      startDate: formattedStartDate, //"2024-09-17T06:36:13.041Z", //this.startDate,
      endDate: formattedEndDate, //"2024-09-17T06:36:13.041Z", // this.endDate,
      startTime: formattedStartTime, //"08:00:00",// this.startTime,
      endTime: formattedEndTime, //"08:00:00", //this.endTime,
      leaveType: Number(this.leaveType),
      description: this.description
    }

    this._CS.AddLeave(leave).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.updateTable();

  }

  updateTable(): void {
    this._CS.GetDoctorLeaveById(this.dcotorId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.listOfLeave = response;
      },
      error: (error) => {
        console.log(error);

      }
    });
  }

  onDateChange(result: Date[]): void {
    if (result && result.length == 2) {
      this.startDate = result[0];
      this.endDate = result[1];
    }
  }
}
