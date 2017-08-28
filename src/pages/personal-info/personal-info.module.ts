import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalInfoPage } from './personal-info';

@NgModule({
  declarations: [
    PersonalInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalInfoPage),
  ],
  exports: [
    PersonalInfoPage
  ]
})
export class PersonalInfoPageModule {}
