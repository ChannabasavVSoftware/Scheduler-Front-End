import { Observable, Observer } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuth, IDToken, AccessToken } from '@okta/okta-auth-js';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class OktaAuthService {

  // CLIENT_ID = environment.CLIENT_ID;
  // ISSUER = environment.ISSUER
  // LOGIN_REDIRECT_URI = window.location.origin + '/login/callback';
  // LOGOUT_REDIRECT_URI = window.location.origin;

  oktaAuth = new OktaAuth({
    clientId: environment.CLIENT_ID,
    issuer: environment.ISSUER,
    redirectUri: window.location.origin + '/login/callback',
    pkce: true
  });

  $isAuthenticated: Observable<boolean>;
  private observer?: Observer<boolean>;
  constructor(private router: Router) {
    this.$isAuthenticated = new Observable((observer: Observer<boolean>) => {
      this.observer = observer;
      this.isAuthenticated().then(val => {
        observer.next(val);
      });
    });
  }

  async isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    return !!(await this.oktaAuth.tokenManager.get('accessToken'));
  }

  login(originalUrl: string) {
    // Save current URL before redirect
    sessionStorage.setItem('okta-app-url', originalUrl || this.router.url);

    // Launches the login redirect.
    this.oktaAuth.token.getWithRedirect({
      scopes: ['openid', 'email', 'profile']
    });
  }

  async handleAuthentication() {
    const tokenContainer = await this.oktaAuth.token.parseFromUrl();

    this.oktaAuth.tokenManager.add('idToken', tokenContainer.tokens.idToken as IDToken);
    this.oktaAuth.tokenManager.add('accessToken', tokenContainer.tokens.accessToken as AccessToken);

    if (await this.isAuthenticated()) {
      this.observer?.next(true);
    }

    // Retrieve the saved URL and navigate back
    const url = sessionStorage.getItem('okta-app-url') as string;
    this.router.navigateByUrl(url);
  }

  async logout() {
    localStorage.removeItem("UserInfo");
    await this.oktaAuth.signOut({
      postLogoutRedirectUri:  window.location.origin
    });
  }

  async getUserInfo() {
    return this.oktaAuth.getUser();
    // this.oktaAuth.getUser().then((data)=>{
    // });
  }
}