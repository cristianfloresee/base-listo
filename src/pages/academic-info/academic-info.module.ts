import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcademicInfoPage } from './academic-info';

@NgModule({
  declarations: [
    AcademicInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(AcademicInfoPage),
  ],
  exports: [
    AcademicInfoPage
  ]
})
export class AcademicInfoPageModule {}
