import { Component } from '@angular/core';
import { IonicPage, NavController,NavParams,ModalController} from 'ionic-angular';

/**
 * Generated class for the FormModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'form-modal',
  templateUrl: 'form-modal.html'
})
export class FormModalComponent {

  text: string;

  constructor() {
    console.log('Hello FormModalComponent Component');
    // this.text = 'Hello World';
  }
  // presentProfileModal() {
  //   let TasksModal = this.modalCtrl.create(FormModalComponent);
  //   TasksModal.present();
  // }

}
