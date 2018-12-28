import { LoginPage } from './../login/login';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation} from '@ionic-native/geolocation';


/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  date:any = new Date().toString();
  lat: any;
 lon: any;
 message: any;
 watchId: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public geo: Geolocation) {
    this.lat = "-";
    this.lon = "-";
    this.message = "-";

  }

  startGeo()
  {
    let geoOption = { enableHighAccuracy : true};
    this.navCtrl.push(LoginPage);
    try
    {
          this.watchId = this.geo.watchPosition(geoOption).subscribe(data => {
    this.lat = data.coords.latitude;
    this.lon = data.coords.longitude;

  },
  error =>
  {
    this.message = "GPS Error" + error;
  }
  );
    }catch(err)
    {
      alert("Error" + err);
      this.message = "Error " + err;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
