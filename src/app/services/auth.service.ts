import { AfterViewInit, EventEmitter, Injectable, OnInit,Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authService {

  
  userInfo: any;
  private authStateSubject = new Subject<boolean>();
  public isAuthenticated: boolean = false;

  constructor(private oktaAuthState: OktaAuthStateService,
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth,
    private _router:Router
    ) {
    this.oktaAuthState.authState$.subscribe(
      async (authState) => {
        this.isAuthenticated = authState.isAuthenticated ?? false;
        this.authStateSubject.next(this.isAuthenticated);
        
        if (this.isAuthenticated) {
          await this.getUserInfo();
        }
      } 
    );
  }
  
  async getUserInfo() {
    try {
      if (this.isAuthenticated) {
        this.userInfo = await this.oktaAuth.getUser();
        if (this.userInfo) {
          localStorage.setItem('UserInfo', JSON.stringify(this.userInfo));
        } else {
          console.error('User information not available.');
        }
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }


  getAuthenticationState() {
    return this.authStateSubject.asObservable();
  }

  async checkAuthentication() {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      const storedUserInfo = localStorage.getItem('UserInfo');
      if (storedUserInfo) {
        this.userInfo = JSON.parse(storedUserInfo);
        console.log('Stored user info:', this.userInfo);
      } else {
        await this.getUserInfo();
      }
    }
  }

  logout() {
    this.oktaAuth.signOut();
    localStorage.removeItem('UserInfo');
  }


//Temp Auth

private readonly USERNAME_KEY = 'username';



login(username: string): void {
  localStorage.setItem(this.USERNAME_KEY, username);
}

logoutT(): void {
  localStorage.removeItem(this.USERNAME_KEY);
  this._router.navigate(['/login']);
}

isLoggedIn(): boolean {
  return !!localStorage.getItem(this.USERNAME_KEY);
}

getUsername(): string | null {
  return localStorage.getItem(this.USERNAME_KEY);
}



























   

}

