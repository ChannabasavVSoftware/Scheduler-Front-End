import { AfterViewInit, Injectable, OnInit,Inject, EventEmitter } from '@angular/core';
import { OktaAuthService } from 'src/app/services/oktaAuth.service';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { environment } from 'src/environments/environment';


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


  


  // Max Survey Client //

  constructor(
    public oktaAuthService: OktaAuthService,
    public authService: OktaAuthStateService,
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth) {
      if(environment.userAuthentication){
        this.checkAuth()
      }
  }

 
  ngOnInit() {
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


  
}

