// import {Injectable } from '@angular/core';
// import { HttpClient,  HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { ImportSurveyResult } from '../models/importSurveyResult';
// import { wellListData } from '../models/wellList';
// import { MagneticModel } from '../models/MagneticModel';
// import { Coordinates } from '../models/Coordinates';
// import { CalcMagValues } from '../models/CalcMagValues';
// import { environment } from '../../environments/environment';

import { HttpClient,HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  constructor(private _http: HttpClient){}
  
  public getVersion(){
    return this._http.get(`${environment.baseUrl}/serverversion`)
  }


  public GetUserDetails(ContactNumber){
    const url = `${environment.baseUrl}/Patient/${ContactNumber}`;
    return this._http.get(url);
  }

  public GetDoctorSlots(SelectedDate:any,DoctorId:string){

    console.log("This is doctor Id:"+DoctorId);
    
    let params = new HttpParams()
    .set('appointmentDate', SelectedDate)
    .set('doctorId', DoctorId);


    const url=`${environment.baseUrl}/Slot`;
    return this._http.get(url,{params});
  }

  public BookAppointment(Appointment:any){
    return this._http.post(`${environment.baseUrl}/Appointments`,Appointment);
   
  }

  public GetPatientAppointmentHistory(PatientId:any){


    console.log("Patient ID : "+PatientId);
    let params = new HttpParams()
    .set('patientId',PatientId);

    return this._http.get(`${environment.baseUrl}/Appointments/GetPatientAppointmentHistory`,{params});
  }


public GetDoctorAppointmentHistory(DoctorId:any){
  
  let params = new HttpParams()
  .set('doctorId',DoctorId);

  return this._http.get(`${environment.baseUrl}/Appointments/GetDoctorAppointmentHistory`,{params});
}








}
