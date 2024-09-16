import { Inject, Injectable, Injector } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
// HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
// import { OktaAuth } from '@okta/okta-auth-js';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  public accessToken = '';
  public accessTokenExp: number = 0;

  constructor(
    private injector: Injector,
    // public oktaAuth: OktaAuth,
    public _router: Router,
    private _notification: NzNotificationService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth
  ) {
    // this.accessToken = this.oktaAuth.getAccessToken();
    // this.accessTokenExp = this.oktaAuth.token.decode(this.accessToken).payload.exp
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    // console.log("this.envMode",this.envMode)
    if (environment.userAuthentication) {
      const token = this._oktaAuth.getAccessToken();
      if (localStorage.getItem('okta-token-storage') !== null) {
        // const token = JSON.parse(localStorage.getItem('okta-token-storage')).accessToken.accessToken
        if (token) {
          request = request.clone({
            setHeaders: {
              // Authorization: this.envMode === 'cloud'?'Bearer ' + token : ''
              Authorization: 'Bearer ' + token,
            },
          });
        }
      } else {
        const token = '';
      }
    } else {
      const token = '';
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log("APIEndpointError::",error)
        if (error.status === 401) {
          this._router.navigate(['/home']);
          /* if (error.error.error === 'invalid_token') {
            // this.authService.refreshToken({refresh_token: refreshToken})
            //   .subscribe(() => {
            //     location.reload();
            //   });
              this.oktaAuth.revokeRefreshToken().then((data) => {
            })
            // .subscribe(() => {
            //   location.reload();
            // });
          } else {
            // this.router.navigate(['home']).then(_ => console.log('redirect to login'));
          } */
        } else if (error.status === 400) {
          if (error.error.message !== null && error.error.message !== undefined) {
            this._notification.error('', error.error.message, {
              nzClass: '_notification-class',
              nzPlacement: 'topRight',
              nzDuration: 5000,
            });
          }
        } else {
          console.log(error)
          // if(error.message !== undefined){
          //   this._notification.error('', error.message, {
          //     nzClass: '_notification-class',
          //     nzPlacement: 'topRight',
          //     nzDuration: 5000,
          //   });
          // }
        }
        return throwError(error);
      })
    );
  }

  //  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //    if (!this.isRefreshing) {
  //      this.isRefreshing = true;
  //      this.refreshTokenSubject.next(null);
  //      const token = this.oktaAuth.getRefreshToken();
  //      if (token)
  //        return this.oktaAuth.tokenManager.renewToken(token).pipe(
  //          switchMap((token: any) => {
  //            this.isRefreshing = false;
  //            this.tokenService.saveToken(token.accessToken);
  //            this.refreshTokenSubject.next(token.accessToken);
  //            return next.handle(this.addTokenHeader(request, token.accessToken));
  //          }),
  //          catchError((err) => {
  //            this.isRefreshing = false;
  //            this.tokenService.signOut();
  //            return throwError(err);
  //          })
  //        );
  //    }
  //   return this.refreshTokenSubject.pipe(
  //     filter(token => token !== null),
  //     take(1),
  //     switchMap((token) => next.handle(this.addTokenHeader(request, token)))
  //   );
  // }

  async logout() {
    // await this.oktaAuth.signOut();
    this._router.navigate(['/home']);
  }
}
