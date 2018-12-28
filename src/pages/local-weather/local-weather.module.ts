import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocalWeatherPage } from './local-weather';
import {FormModalComponent} from '../form-modal/form-modal';

@NgModule({
  declarations: [
    LocalWeatherPage,FormModalComponent
  ],
  imports: [
    // FormModalComponent,
    IonicPageModule.forChild(LocalWeatherPage)
  ],
  exports: [
    LocalWeatherPage
  ]
})

export class LocalWeatherModule { }
