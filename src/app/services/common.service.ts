import { AfterViewInit, Injectable, OnInit,Inject, EventEmitter } from '@angular/core';
import { OktaAuthService } from 'src/app/services/oktaAuth.service';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { environment } from 'src/environments/environment';
import { CommunicationService } from './communication.service';
import { BehaviorSubject } from 'rxjs';


interface Claim {
  claim: string;
  value: string;
}

// declare function loadingServiceShow(zindex, id, flag, msg);
// declare function loadingServiceHide(id);

@Injectable({
  providedIn: 'root'
})
export class CommonService implements OnInit, AfterViewInit {

  public isSidebarCollapsed : boolean =  true;
  public isLoggedIn : EventEmitter<any>

  //Auth //
  public env = environment;
  public userInfo: any = null;
  userName: string;
  userEmail: string = "";
  isAuthenticated: boolean;
  userClaims: any;
  idToken;
  claims: Array<Claim>;

  public PatientDetailsSubject : any = new BehaviorSubject(null);
  public DoctorDetailsSubject : any = new BehaviorSubject(null);
  public SelectedPatientSubject : any = new BehaviorSubject(null);

  PatientDetails$ = this.PatientDetailsSubject.asObservable();
  DoctorDetails$ = this.DoctorDetailsSubject.asObservable();
  SelectedPatient$ = this.SelectedPatientSubject.asObservable();
  
  PatientDetails:any;
  DoctorDetails:any;
  SelectedPatient:any="";

  // Max Survey Client //

  constructor(
    public oktaAuthService: OktaAuthService,
    public authService: OktaAuthStateService,
    private CommuncicationService:CommunicationService,
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {
      if(environment.userAuthentication){
        this.checkAuth()
      }
    }
    
    
    ngOnInit() {
      
      this.FetchPatientDetails();
      const SelectedPatientId = localStorage.getItem('SelectedPatient');
      console.log("Selected Patient Id : "+SelectedPatientId)
      this.SelectedPatient=this.PatientDetails.find(p=>p.patientId==SelectedPatientId)
      console.log("Selected Patient"+this.SelectedPatient);
    
    
  }

  FetchPatientDetails(){
    this.CommuncicationService.GetUserDetails(localStorage.getItem('username')).subscribe({
      next:(response:any)=>{
        this.PatientDetails=response.patient;
        this.DoctorDetails=response.doctor;
      }
    })

  }






  async checkAuth(){
    if (environment.userAuthentication) {
      if (localStorage.getItem("UserInfo") !== undefined && localStorage.getItem("UserInfo") !== null) {
        this.userInfo = JSON.parse(localStorage.getItem("UserInfo"))
        console.log('this.userInfo', this.userInfo)
      }
      else {
        await this.authService.authState$.subscribe(
          {
            next:
              authenticated => {
                if (authenticated) {
                  this.isAuthenticated = true;
                  // loadingServiceShow(1, 'addwellbtn', true, 'Initializing ');
                  this.oktaAuth.getUser().then((data) => {
                    // loadingServiceHide('addwellbtn');
                    this.userInfo = data;
                    console.log(' this.userInfo',  this.userInfo)
                    localStorage.setItem("UserInfo", JSON.stringify(this.userInfo))
                  },(err)=>{
                    // loadingServiceHide('addwellbtn');
                  });
                }
              }
          }
        )
      }

    }
  }
  
 logout() {
    this.oktaAuthService.logout();
  }

  ngAfterViewInit(): void { }



  SetUserDetails(Patient:any){
    this.PatientDetails=Patient;

  }


 


  
}

