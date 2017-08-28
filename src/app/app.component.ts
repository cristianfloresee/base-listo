
import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform, LoadingController, MenuController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

import { UtaService } from '../providers/uta-service';
import { StorageService } from './../providers/storage-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {

  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages:    Array<{title: string, component: any, icon: string}>;
  user:     any;
  profile_image;

  constructor(
    public platform:     Platform, 
    public statusBar:    StatusBar,
    public splashScreen: SplashScreen,
    private oneSignal:   OneSignal,
    public _uta:         UtaService,
    public _storage:     StorageService,
    public loadingCtrl:  LoadingController,
    public menuCtrl:     MenuController,
    public events:       Events,
    public storage:      Storage
    
  ) {
    this.user  = null; // DATOS DE USUARIO ACTUAL

    //PAGINAS DEL MENU
    this.pages = [
      { title: 'Inicio', component: 'HomePage', icon: 'home' },
      { title: 'Información Personal', component: 'PersonalInfoPage', icon: 'clipboard' },
      { title: 'Información Académica', component: 'AcademicInfoPage', icon: 'school' },
    ];
     this.profile_image = "http://chitita.uta.cl/fotos/0183139614.JPG";
  }

  ngOnInit() {
    this.initializeApp();  // INICIALIZA PLUGINS Y LLAMADAS NATIVAS

    let loader = this.loadingCtrl.create();
    loader.present();

    //PREGUNTAR SI ESTA LOGEADO
    this._uta.getAuth().then( auth => {
      loader.dismiss();
      this.user = auth;
      console.log(auth);
      if ( auth ){
      // SI ESTA LOGEADO ACTIVAR MENU E IR A PAGINA 'HomePage'
        this.menuCtrl.enable(true);
        this._uta.getUserData(this.user.personal.PER_ID);
        this.nav.setRoot('HomePage', {}, { animate: true, direction: 'forward' });
        // this.rootPage = "HomePage";
      } else {
      // EN CASO CONTRARIO DESACTIVAR MENU E IR A PAGINA 'LoginPage'
        this.menuCtrl.enable(false);
       
        this.nav.setRoot('LoginPage', {}, { animate: true, direction: 'forward' });
        // this.rootPage = "LoginPage";
      }
    })

    //MANEJADORES DE EVENTOS LOGIN & LOGOUT
    this.events.subscribe("login:success",  user => this.onLogin(user));
    this.events.subscribe("logout:success",  _ => this.onLogout());
  }
  // ON INIT


  //INICIALIZACION DE PLUGINS NATIVOS
  initializeApp() {
    this.platform.ready().then((res) => {

      if (res == 'cordova') {
        
        if (this.platform.is('android')) {
          this.statusBar.backgroundColorByHexString("#33000000");
        }
        
        //CONFIGURACION STATUSBAR
        //this.statusBar.overlaysWebView(true);
        //this.statusBar.styleBlackTranslucent()
        //this.statusBar.backgroundColorByHexString('#BE8909');
        //this.statusBar.backgroundColorByHexString("#33000000");
		    //FIN STATUS BAR

        //CONFIGURACION SPLASHSCREEEN
        this.splashScreen.hide();
        //FIN SPLASHSCREEN

        //CONFIGURACION ONESIGNAL
        this.oneSignal.startInit("237040ab-54a9-4cd4-b6b6-1a48d3c31327", "293024235261")
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
        this.oneSignal.handleNotificationReceived().subscribe(() => {
            //hace algo cuando la notificacion es recibida
        });

        this.oneSignal.handleNotificationOpened().subscribe(() => {
            //hace algo cuando la notificacion es abierta
        });
        this.oneSignal.endInit();

        this.oneSignal.getIds()
        .then((ids)=> {
          this.storage.ready()
          .then( _ => {
            this.storage.set('onesignal_id', ids.userId);
            alert("PLAYER_ID DEL INIT: "+ ids.userId);
          });
        })
        //FIN ONESIGNAL
      }

    });
  }


  //IR A PAGINA ESPECIFICA
  openPage(page) {
    this.nav.setRoot(page.component);
  }


  //CERRAR SESION
  logout() {
    let loader = this.loadingCtrl.create();
    loader.present();

    this._uta.logout()
    .then(_ => {

      //ARREGLAR ESTO, SE SUPONE QUE CAPTURO SI SE EJECUTO EL LOGOUT CORRECTAMENTE PERO Y SI NO HAY CONEXION
      loader.dismiss();
    })
  }

  //ALERTMESAJE?


  //CUANDO SE EMITE EL EVENTO LOGIN
  onLogin(user){
    console.log("onLogin:", user);
    this.user = user;
    this.menuCtrl.enable(true);
  }


  //CUANDO SE EMITE EL EVENTO LOGOUT
  onLogout(){
    console.log("onLogout");
    this.user = null;
    this.menuCtrl.enable(false);
    this.nav.setRoot('LoginPage', {}, { animate: true, direction: 'forward' });
  }
}
