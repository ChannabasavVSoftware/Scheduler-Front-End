import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalComponent } from './sharedComponent/modal/modal.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment.development';
import {OKTA_CONFIG,OktaAuthModule} from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/TokenInterceptor.service';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SharedModule } from './shared-module/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NzPageHeaderFooterDirective } from 'ng-zorro-antd/page-header';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { FullCalendarModule } from '@fullcalendar/angular';
// import { FullCalendarComponent } from './full-calendar/full-calendar.component';






registerLocaleData(en);

const config = {
  issuer: environment.ISSUER,
  clientId: environment.CLIENT_ID,
  redirectUri: environment.LOGIN_REDIRECT_URI,
  scopes: environment.scopes,
  pkce: true
}

const oktaAuth = new OktaAuth(config);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    // FullCalendarComponent
    
    
    // BookAppointmentComponent,
    // ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OktaAuthModule,
    SharedModule,
    NgbModule,
    NzPageHeaderFooterDirective,
    FullCalendarModule
    // NzNotificationService
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
