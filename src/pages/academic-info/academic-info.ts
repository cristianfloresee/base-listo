import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-academic-info',
  templateUrl: 'academic-info.html',
})
export class AcademicInfoPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('Página de Información Académica Cargada...');
  }

}
