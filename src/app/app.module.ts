import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import {Camera} from '@ionic-native/camera';

import { LoginPage } from '../pages/login/login';
import { StartPage } from '../pages/start/start';
import { NojobsPage } from '../pages/nojobs/nojobs';
import { JobsPage } from '../pages/jobs/jobs';
import { SamplejobPage } from '../pages/samplejob/samplejob';
import { SignaturePage } from '../pages/signature/signature';
import { UnsuccessfuljobPage } from '../pages/unsuccessfuljob/unsuccessfuljob';
import { SuccessfuljobPage } from '../pages/successfuljob/successfuljob';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CallNumber } from '@ionic-native/call-number';
import {SMS} from '@ionic-native/sms';
import { SignaturePadModule } from 'angular2-signaturepad';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { Badge } from '@ionic-native/badge';

//<script src="https://www.gstatic.com/firebasejs/4.1.3/firebase.js"></script>
//<script>
  // Initialize Firebase
  var firebaseAuth = {
    apiKey: "AIzaSyD_gO8BEBLbHYWQlV43Y8ZGQDa404pA0w0",
    authDomain: "etrack-d3f5b.firebaseapp.com",
    databaseURL: "https://etrack-d3f5b.firebaseio.com",
    projectId: "etrack-d3f5b",
    storageBucket: "etrack-d3f5b.appspot.com",
    messagingSenderId: "715060152499"
  };
  //firebase.initializeApp(config);
//</script>


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    StartPage,
    NojobsPage,
    JobsPage,
    SamplejobPage,
    UnsuccessfuljobPage,
    SuccessfuljobPage,
    SignaturePage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule, SignaturePadModule,
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    StartPage,
    NojobsPage,
    SamplejobPage,
    UnsuccessfuljobPage,
    SuccessfuljobPage,
    SignaturePage,
    JobsPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    CallNumber,
    SMS,
    BarcodeScanner,
    Badge,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
