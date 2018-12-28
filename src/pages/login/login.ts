import {Component, OnInit} from "@angular/core";
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {IonicPage, NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import { LoginService } from './login.services';

@IonicPage({
  name: 'page-login',
  segment: 'login',
  priority: 'high'
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
  // providers: [LoginService]
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  users: any;
  showerrmsg: boolean = false;
  constructor(private _fb: FormBuilder, public nav: NavController, public forgotCtrl: AlertController,
    public menu: MenuController, public toastCtrl: ToastController,private LS:LoginService) {
    this.menu.swipeEnable(false);
    this.menu.enable(false);
  }

  ngOnInit() {
    this.onLoginForm = this._fb.group({
      email: ['', Validators.compose([
                  Validators.required
      ])],
      password: ['', Validators.compose([
                     Validators.required
      ])]
    });
    this.hidemsg()
    localStorage.clear();
  }

  // go to register page
  register() {
    this.nav.setRoot('page-register');
  }
  hidemsg() {
    this.showerrmsg = false;
   }
  // login and go to home page
  login() {
    // this.nav.setRoot('page-home');
    
    this.LS.login(this.onLoginForm.value).subscribe(res => {
      debugger;
      if (res != undefined && res != null) {
        debugger;
        // this.user = (res);
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',res);
        if (res.status != 401)
        {
          localStorage.setItem('token', res.id_token);
          this.LS.getUserdetail().subscribe((users: any) => {
            console.log(users);
            
            localStorage.setItem('userid',users.email);
            localStorage.setItem('username',users.login.trim());
            debugger;
            this.LS.getUserDetailByObservable();
          });
          debugger;
            localStorage.setItem('token', res.id_token);
        this.nav.setRoot('page-home');
        this.showerrmsg = false;
        
        }
      else
      {
        debugger;
        this.showerrmsg = true;
      }        
      }
      else{
        debugger;
        this.showerrmsg = true;
      }
    },error => {
      debugger;
           // error("Please enter the valid UseriId and Password");
           console.log(error);
            this.showerrmsg = true;
          })

   
  }





  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }




}
