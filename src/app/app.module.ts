import { AndroidPermissions } from '@ionic-native/android-permissions';
import {ErrorHandler, NgModule} from "@angular/core";
import { ItemPage } from './../pages/item/item';
import { LogoutPage } from './../pages/logout/logout';
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {CalendarModule} from "ion2-calendar"
import {AgmCoreModule} from '@agm/core';
import { TokenInterceptor } from '../common/auth/httpinterceptor';
import { HttpRequestService } from '../common/services/http-request.service';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Keyboard} from '@ionic-native/keyboard';

import {HotelService} from "../providers/hotel-service";
import {PlaceService} from "../providers/place-service";
import {ActivityService} from "../providers/activity-service";
import {CarService} from "../providers/car-service";
import {TripService} from "../providers/trip-service";
import {TaskProvider} from '../providers/tasks.service';
import {MessageService} from '../providers/message-service-mock';

import { SQLite } from '@ionic-native/sqlite';
// import { IonicStorageModule } from '@ionic/storage';

import {QuatlaDMSApp} from "./app.component";
import { config } from '../common/config';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignaturePage } from '../pages/signature/signature';
import { Geolocation } from '@ionic-native/geolocation';


import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { LoginService } from "../pages/login/login.services";
import { Uid } from '@ionic-native/uid';

@NgModule({
  declarations: [
    QuatlaDMSApp,
    SignaturePage,
    ItemPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SignaturePadModule,
    IonicModule.forRoot(
      QuatlaDMSApp,
      {
        preloadModules: true,
        scrollPadding: false,
        scrollAssist: true,
        autoFocusAssist: false
      },

    ),
    IonicStorageModule.forRoot({
      name: '__QuatlaDMSDB',
      driverOrder: [ 'sqlite', 'indexeddb', 'websql']
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9BxeSvt3u--Oj-_GD-qG2nPr1uODrR0Y'
    }),
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    QuatlaDMSApp,
    SignaturePage,
    ItemPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    HotelService,
    AndroidPermissions,
    Uid,
    PlaceService,
    ActivityService,
    CarService,
    TripService,
    TripService,
    MessageService,
    TaskProvider,
    Geolocation,
    config,
    LogoutPage,
    ItemPage,
    FileTransfer,
    LoginService,
    TaskProvider,
    SQLite,
    // FileUploadOptions,
  FileTransferObject,
  File,
  Camera,
    {provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true},
    HttpRequestService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }

  ]
})

export class AppModule {
}
