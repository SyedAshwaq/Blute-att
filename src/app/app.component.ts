import { Component, ViewChild } from "@angular/core";
import { Platform, Nav, NavController } from "ionic-angular";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginService } from "../pages/login/login.services";

export interface MenuItem {
    title: string;
    component: any;
    icon: string;
}

@Component({
  templateUrl: 'app.html'
  //providers: [LoginService]
})

export class QuatlaDMSApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = "page-login";
  users: any;
  name: any;
  email: any;
  // imavailable:boolean=false;
  showMenu: boolean = true;
  // rootNavCtrl: NavController;

  appMenuItems: Array<MenuItem>;
  subscription: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private LS:LoginService,
    // private navCtrl:NavController
  ) {
    this.initializeApp();
    // this.getUserDetails();
    // this.backAction();
    platform.registerBackButtonAction(() => {
    // console.log("second");
    //this.navCtrl.pop();
    // this.backAction();
  },2)
  this.name =localStorage.getItem('userid');
  this.email = localStorage.getItem('username');
    // this.app.getRootNavs()[0]
    // this.app._rootNavs.map(page => {
    //   console.log(page)
    // })
    // console.log(this.nav)

    this.appMenuItems = [
      {title: 'Home', component: 'page-home', icon: 'home'},
      // {title: 'My Tasks', component: 'page-message-list', icon: 'mail'},
      // {title: 'Task', component: 'page-message-list', icon: 'mail'},
      {title: 'Expenses', component: 'page-search-cars', icon: 'briefcase'},
      // {title: 'Purchases', component: 'page-search-trips', icon: 'beer'},
      // {title: 'Favorites', component: 'page-favorite-list', icon: 'heart'},
      // {title: 'Booking List', component: 'page-booking-list', icon: 'briefcase'},
      // {title: 'Support', component: 'page-support', icon: 'help-buoy'}
    ];
  }
  // backAction(){
  //   platform.registerBackButtonAction(() => {
  //   console.log("second");
  //   this.navCtrl.pop();
  //   this.backAction();
  // },2)
// }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      this.keyboard.disableScroll(true);
      // localStorage.clear();
      this.subscription = this.LS.getUserDetailObservable.subscribe(
        result  => this.getUserDetail());
    });
  }



  getUserDetail(){
    this.name =localStorage.getItem('userid');
    this.email = localStorage.getItem('username');
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.nav.setRoot('page-login');
  }

  editProfile() {
    this.nav.setRoot('page-edit-profile');
  }

  // public getUserDetails(){
  //   this.LS.getUserdetail().subscribe((users: any) => {
  //     console.log(users);
  //     // localStorage.getItem('userid');
  //     // localStorage.getItem('username');
  //     this.name =localStorage.getItem('userid');
  //     this.email = localStorage.getItem('username');
  //   });
  // }


}
