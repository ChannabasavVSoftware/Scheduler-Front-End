import { Component } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { authService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {

  constructor(private _CommunService:CommunicationService,private _CommonService:CommonService,private _router:Router,private authService :authService ){

  }

  UserName : any;
  Password :string;

  PatientDetails:any;
  DoctorDetails:any;

  GetUserDetails(){
    this._CommunService.GetUserDetails(this.UserName).subscribe({
      next:(response:any)=>{
        this.PatientDetails=response.patient;
        this.DoctorDetails=response.doctor;
        this.authService.login(this.UserName);
        this._CommonService.PatientDetails=response.patient;
        this._CommonService.DoctorDetails=response.doctor;
        this._router.navigate(['/userprofiles'])
        
      },
      error:(error)=>{
        console.error("Error Occured : "+error);
      }
    })

  }

}
