import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profiles',
  templateUrl: './user-profiles.component.html',
  styleUrl: './user-profiles.component.less'
})
export class UserProfilesComponent {

  PatientDetails:any;
  
  constructor(private _CommonService:CommonService,private _Router :Router ){
    
    this.PatientDetails=_CommonService.PatientDetails;  

    if(_CommonService.PatientDetails.length==1){
      this._CommonService.SelectedPatient=this.PatientDetails[0];
      localStorage.setItem('SelectedPatient',this.PatientDetails[0].patientId)
      _Router.navigate(['/bookappointment'])
    }
  }
  

  GoToUser(Patient:any){
    this._CommonService.SelectedPatient=Patient;
    localStorage.setItem('SelectedPatient',Patient.patientId);
    this._Router.navigate(['/bookappointment']);
  }



}
