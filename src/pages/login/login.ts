import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, Alert } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';  // VALIDACIONES DE FORMULARIO
// import { CustomValidators } from 'ng2-validation';                    // VALIDACIONES PERSONALIZADAS DE FORMULARIO

import { UtaService } from '../../providers/uta-service';
import { Base64Service } from '../../providers/base64-service';

@IonicPage()
@Component({
  selector:    'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  public backgroundImage = 'assets/img/background/background-1.jpg';

  constructor(
    public navCtrl:     NavController,
    public fb:          FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl:   AlertController,
    public _uta:        UtaService,
    public _base64:     Base64Service
  ) {
    //GRUPO DE VALIDACIONES PARA EL FORMULARIO
    this.loginForm = this.fb.group({
  
      rut:   ["18313961",   Validators.compose([ Validators.required ])],
      clave: ["08/12/1992", Validators.compose([ Validators.required ])],
    });
  }


  ionViewDidLoad() {
  }

  //LLAMADA A SERVICIO DE LOGIN
  login(){
    let loader = this.loadingCtrl.create();
    loader.present();

    this._uta.login(this.loginForm.value.rut, this._base64.encode(this.loginForm.value.clave))
    .then( _ => {
      loader.dismiss();
      this.navCtrl.setRoot('HomePage', {}, { animate: true, direction: 'forward' });
    })
    .catch(error => {
      loader.dismiss();

      switch (error.error) {  //DEPENDIENDO DEL ERROR LO MUESTRA EN FORMULARIO
        case "Usuario no se encuentra registrado.":
          this.loginForm.controls.rut.setErrors({ norut: true }); 
          break;
        case "Clave no valida.":
          this.loginForm.controls.clave.setErrors({ wrongpass: true }); 
          break;
        default:
          console.log("Error no registrado: ", error); 
          error.error = "Error al conectarse con el servidor, revise su conexión a internet ó intentelo mas tarde."
          break;
      }

      this.alertMsg("Inicio sesión", error.error); // MOSTRAR MSG CON EL ERROR
      
      // RECORRE TODOS LOS CAMPOS DEL FORMULARIO Y LOS 'ENSUCIA' PARA MOSTRAR LOS ERRORES EXISTENTES
      Object.keys(this.loginForm.controls).forEach(key => { 
        this.loginForm.controls[key].markAsDirty();
        this.loginForm.controls[key].markAsTouched();
      });
    })
  }


  //MOSTRAR UN PEQUEÑO ALERT CON MENSAJE ESPECIFICO
  alertMsg(titulo: string, msg: string): Alert {
    let alert = this.alertCtrl.create({
      title:    titulo,
      subTitle: msg,
      buttons:  ['Aceptar']
    })
    alert.present();
    return alert;
  }

}
