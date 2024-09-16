import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { CommunicationService } from 'src/app/services/communication.service';

 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})  
export class HomeComponent {

  // Modal Declaration  add modal variable for each modal//
  isModalVisible = false;
  isModalTestVisible = false;

  openModal(modalVariableName:string): void {
    this[modalVariableName] = true;
  }  

  onIsVisibleChange(modalVariableName:string,isVisible: boolean): void {
    this[modalVariableName] = isVisible;
  }  

  // Modal Declaration //


  // table Data //

  // Table Data  

  public version:string;
  constructor(public _commonService: CommonService,
    private _communicationService: CommunicationService
  ) {
    this._communicationService.getVersion().subscribe((data:any)=>{
      this.version = data.data
    })
  }

  // NowDate:Date=new Date();
  // listOfData: Appointment[] = [
  //   {
  //     AppointmentID: "AID001",
  //     DoctorName: "Dr.Priya ",
  //     PatientName: "Patient One",
  //     AppointmentDate:this.NowDate ,
  //     AppointmentTime:this.NowDate,
  //     AppointmentStatus:"Scheduled"
  //   },
  //   {
  //     AppointmentID: "AID001",
  //     DoctorName: "Dr.Priya ",
  //     PatientName: "Patient One",
  //     AppointmentDate: this.NowDate,
  //     AppointmentTime:this.NowDate,
  //     AppointmentStatus:"Scheduled"
  //   },
  //   {
  //     AppointmentID: "AID001",
  //     DoctorName: "Dr.Priya ",
  //     PatientName: "Patient One",
  //     AppointmentDate: this.NowDate,
  //     AppointmentTime:this.NowDate,
  //     AppointmentStatus:"Scheduled"
  //   }
  // ];

}
