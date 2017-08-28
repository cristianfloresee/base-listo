import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule  } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

import { IonicStorageModule } from '@ionic/storage';               //MODULO PARA PODER USAR STORAGE
import { HttpModule } from '@angular/http';                        //MODULO PARA PODER HACER PETICIONES HTTP
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; //MODULOS PARA HACER LOS FORMULARIOS REACTIVOS

//SERVICIOS
import { UtaService } from '../providers/uta-service'; 
import { Base64Service } from '../providers/base64-service';
import { StorageService } from './../providers/storage-service';
import { CamelCaseService } from './../providers/camelcase-service';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    UtaService,
    Base64Service,
    CamelCaseService,
    StorageService,
    StatusBar,
    SplashScreen,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
