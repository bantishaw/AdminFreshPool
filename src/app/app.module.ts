import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Api } from '../providers/api/api';
import { LoginPage } from '../pages/login/login';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { UpdateOrderPage } from '../pages/update-order/update-order';
import {ContactUsPage} from '../pages/contact-us/contact-us';
import {FeedbackPage} from '../pages/feedback/feedback';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    UpdateOrderPage,
    ContactUsPage,
    FeedbackPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false, tabsHideOnSubPages: true }),
    HttpClientModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    UpdateOrderPage,
    ContactUsPage,
    FeedbackPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Api
  ]
})
export class AppModule { }
