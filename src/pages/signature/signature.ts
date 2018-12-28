import { Component, ViewChild, Output, EventEmitter, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController}            from 'ionic-angular';
import {SignaturePad}                                         from 'angular2-signaturepad/signature-pad';
import { MessageListPage }                                    from '../message-list/message-list';
import {CarService}                                           from '../../providers/car-service';
import { TaskProvider }                                       from '../../providers/tasks.service';
import { AlertController }                                    from 'ionic-angular';

@Component({
  selector:           'page-signature',
  templateUrl:        'signature.html'
})
export class SignaturePage implements OnInit {

  @ViewChild(SignaturePad) public signaturePad : SignaturePad;
  private task:any;
  private CompletedStatus :any;

  public signaturePadOptions : Object = {
    'minWidth': 2,
    'canvasWidth': 340,
    'canvasHeight': 200
  };
  showdiv: boolean;
  vtask: any;
  loader: any;

  constructor(public navCtrl: NavController, private CS:CarService,private params:NavParams, 
    private taskProvider: TaskProvider,private viewCtrl: ViewController,public loadingCtrl: LoadingController) {
    
    let temptask          = this.params.get('tsk');
    if(temptask.length > 1)
    {
      this.showdiv        = true;
      this.task=temptask;
    }else{
      this.showdiv        = false;
      this.task           = temptask;
      this.vtask          = temptask[0];
    }
    this.CompletedStatus  = 'COMPLETED'
  }

ngOnInit(){
    
}
  drawCancel() {
    this.navCtrl.pop();
  }

   drawComplete() {
      this.CS.setSign(this.signaturePad.toDataURL());
      this.navCtrl.pop();
  }

  drawClear() {
    this.signaturePad.clear();
  }

  canvasResize() {
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1);
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }

ngAfterViewInit() {
      this.signaturePad.clear();
      this.canvasResize();
}
updateTask(){
  debugger;
  let tempSign                                  = this.signaturePad.toDataURL().split(',');
  let sign                                      = tempSign[1];
  let temp2                                     = tempSign[0].split(':');
  let contenttype                               = temp2[1].split(';')[0];
  for(let i = 0;  i < this.task.length; i++){
    let data  ={
      assignee:                                 this.task[i].assignee,
      comments:                                 this.task[i].comments,
      customer_sign:                            sign,
      customer_signContentType :                contenttype,
      customer_sign_time:                       new Date(),
      customerid:                               this.task[i].customerid,
      customername:                             this.task[i].customername,
      id:                                       this.task[i].id,
      location:                                 this.task[i].location,
      product_name:                             this.task[i].product_name,
      quantity:                                 this.task[i].quantity,
      route:                                    this.task[i].route,
      status:                                   this.CompletedStatus,
      task_type:                                this.task[i].task_type,
      challanid:                                this.task[i].challanid,
      orderid:                                  this.task[i].orderid,
      task_seq :                                this.task[i].task_seq,
      associatedtrip :                          this.task[i].associatedtrip,
    }
    // this.taskProvider.updateTask(data).subscribe(res => {
    //   if (res != undefined && res != null) {
        
    //   }
    // })
  
    //   error => {
    //     alert(JSON.stringify(error))
    //   }
    // this.loader = this.loadingCtrl.create({
    //   content: "Loading..."
    // });
    // this.loader.present().then;
    this.taskProvider.updateTask(data).subscribe(res => {
      // this.loader.dismiss();
      // if(this.loader){ this.loader.dismiss(); this.loader = null; }
      // this.showEditList = false;
      // this.CS.reloadGetTask();
//  this.signaturePad.clear();
//  this.navCtrl.pop();
//  modal.present();
//  this.navCtrl.push('page-home');
// this.navCtrl.insert(0,'page-home');
// this.navCtrl.popToRoot();
    })
    
      error => {
        // this.loader.dismiss();
        // if(this.loader){ this.loader.dismiss(); this.loader = null; }
        alert(JSON.stringify(error));
      }
  }
 this.CS.reloadGetTask();
 this.signaturePad.clear();
 this.navCtrl.pop();
}
}
