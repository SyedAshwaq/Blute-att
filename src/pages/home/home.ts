import {Component}                                                                               from "@angular/core";
import {IonicPage, NavController, NavParams, MenuController, ModalController, PopoverController} from "ionic-angular";
import { CalendarModal, CalendarModalOptions, CalendarResult }                                   from "ion2-calendar";
import {NotificationsPage}                                                                       from "../notifications/notifications";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {HotelService}                                                                            from "../../providers/hotel-service";
import { RoutesProvider }                                                                        from "../../providers/routes-services";
import { Routes }                                                                                from "../../interfaces/routes";
import { TaskProvider } from "../../providers/tasks.service";
import { ItemPage } from "../item/item";
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Platform } from 'ionic-angular';

@IonicPage({
  name:                 'page-home',
  segment:              'home',
  priority:             'high'
})

@Component({
  selector:             'page-home',
  templateUrl:          'home.html',
  providers:            [RoutesProvider]
})

export class HomePage {

  taskList:               any;
  customerList:           any;
  dDate:                  Date = new Date();
  searchQuery:            string = '';
  items:                  string[];
  showItems:              boolean = false;
  lat:                    number = -22.9068;
  lng:                    number = -43.1729;
  toggleList :            boolean;
  ListView :              boolean;
  // PageSize:               number;
  routeList:              Routes[];

  public childs:          any;

  public hotellocation:   string;

  // list of hotels
  public hotels:          any;

  // search conditions
  public checkin = {
    name: "Check-in",
    date: new Date().toLocaleString().split(',')[0]
  }

  public checkout = {
    name: "Check-out",
    date: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleString().split(',')[0]
  }
  tasks: any[];
  amavailable: string="OFFLINE";


  constructor(public nav: NavController, public navParams: NavParams, public menuCtrl: MenuController, public modalCtrl: ModalController, public popoverCtrl: PopoverController, public hotelService: HotelService,
    private taskProvider: TaskProvider,private sqlite: SQLite,public platform: Platform, private androidPermissions: AndroidPermissions,private uid: Uid
    ) {
    // set sample data
    this.menuCtrl.swipeEnable(true, 'authenticated');
    this.menuCtrl.enable(true);
//    this.hotels = hotelService.getAll();
    if(localStorage.getItem('toggleList')!=undefined){
      this.toggleList=localStorage.getItem('toggleList').toLowerCase() == 'true' ? true : false;
      this.ListView=this.toggleList;
    }
  }
  gotoPage(emp) {
    emp = emp || 'No emp entered';

    this.nav.push(ItemPage, {
      data: emp
    });
  }
  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATUS
    );
    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATUS
      );
      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }
      return;
    }
    return this.uid.IMEI
  }

  ionViewWillEnter(){

    // (/true/i).test(stringValue)
    this.getTasksbyCustomer();
    console.log( this.toggleList);
  }

  ionViewDidLoad() {
    //this.getTasksbyCustomer();
    // init map
    // this.initializeMap();
  }

  // openCalendar() {
  //   const options: CalendarModalOptions = {
  //     pickMode: 'range',
  //     title: 'Range Date'
  //   };

  //   let myCalendar = this.modalCtrl.create(CalendarModal, {
  //     options: options
  //   });

  //   myCalendar.present();

  //   myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
  //     if (date !== null) {
  //       this.checkin.date = new Date(new Date(date.from.time)).toLocaleString().split(',')[0]
  //       this.checkout.date = new Date(new Date(date.to.time)).toLocaleString().split(',')[0]
  //     }
  //   });
//  }

  // initializeMap() {
  //   let latLng = new google.maps.LatLng(this.hotels[0].location.lat, this.hotels[0].location.lon);

  //   let mapOptions = {
  //     center: latLng,
  //     zoom: 11,
  //     scrollwheel: false,
  //     mapTypeId: google.maps.MapTypeId.ROADMAP,
  //     mapTypeControl: false,
  //     zoomControl: false,
  //     streetViewControl: false
  //   }

  //   this.map = new google.maps.Map(document.getElementById("home-map"), mapOptions);

  //   // add markers to map by hotel
  //   for (let i = 0; i < this.hotels.length; i++) {
  //     let hotel = this.hotels[i];
  //     new google.maps.Marker({
  //       map: this.map,
  //       animation: google.maps.Animation.DROP,
  //       position: new google.maps.LatLng(hotel.location.lat, hotel.location.lon)
  //     });
  //   }

  //   // refresh map
  //   setTimeout(() => {
  //     google.maps.event.trigger(this.map, 'resize');
  //   }, 300);
  // }






  showListView(){
    this.toggleList = !this.toggleList
    localStorage.setItem('toggleList',this.toggleList.toString())
    this.getTasksbyCustomer();
    if( this.toggleList == true){
      this.amavailable="ONLINE";
        if (this.customerList != null)
        {
          this.ListView = true;

        }
      else
        {
          this.ListView = false;

        }
    }
    else{
      this.ListView = false;
      this.amavailable="OFFLINE";
      // this.nav.setRoot('page-home');
    }
    let data={
      "available_status": this.amavailable,
      "latitude": 0,
      "login": localStorage.getItem("username"),
      "longitude": 0,
      "user_id": localStorage.getItem("userid")
    }
    this.taskProvider.amAvailableservice(data).subscribe((tasks: any) => {

    })
  }

  moveToTask(customer){
    // localStorage.setItem('customername',customer.customername);
    // localStorage.setItem('customerid',customer.customerid);
    // to be removed once discussed with Sudharsan

    // localStorage.setItem('location', customer.location);
    // localStorage.setItem('associatedtrip', customer.associatedtrip);
    // localStorage.setItem('tasksequence', customer.task_seq);
    // localStorage.setItem('task_type', customer.task_type);
    // localStorage.setItem('id', customer.task_id);

    // this.nav.push('page-local-weather');console.log(customer);


    this.nav.push('page-message-list', {customer});
  }

  // getRoutes(){
  //   debugger;
  //   this.routesProvider.getRoutesService().subscribe(res=>{
  //     console.log(res);
  //     this.routeList=res;
  //   })
  // }

  getTasksbyCustomer(){

    this.taskProvider.getTaskservice().subscribe((tasks: any) => {
    this.customerList = tasks;
    console.log(this.customerList);
                                    // this.sqlite.create({
                                    //   name: 'ionicdb.db',
                                    //   location: 'default'
                                    // }).then((db: SQLiteObject) => {
                                    //   // db.executeSql('CREATE TABLE [IF NOT EXISTS] [schema_name].table_name (
                                    //   //   column_1 data_type PRIMARY KEY,
                                    //   //     column_2 data_type NOT NULL,
                                    //   //   column_3 data_type DEFAULT 0,
                                    //   //   table_constraint
                                    //   //  ) [WITHOUT ROWID]')';
                                    //   db.executeSql('CREATE TABLE IF NOT EXISTS __QuatlaDMSDB.tasks(id INTEGER PRIMARY KEY, customerId INT, customerName TEXT, customerLocation TEXT, tripId INT, taskSeq INT)', [])
                                    //   .then(res => alert('Executed SQL'))
                                    //   .catch(e => alert(e));
                                    //   for(var i=0; i<this.customerList.length; i++) {
                                    //   db.executeSql('INSERT INTO tasks VALUES(NULL,?,?,?,?)',[this.customerList.customerId,this.customerList.customerName, this.customerList.customerLocation, this.customerList.tripId, this.customerList.taskSeq])
                                    //   .then(res => {
                                    //     // this.tasks = [];
                                    //     // for(var i=0; i<res.rows.length; i++) {
                                    //     //   this.tasks.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date,type:res.rows.item(i).type,description:res.rows.item(i).description,amount:res.rows.item(i).amount})
                                    //     // }
                                    //     alert(res);
                                    //   })
                                    //   .catch(e => alert(e));
                                    // }
                                    // }).catch(e => alert(e));

    //this.taskList = tasks;
  //  let lookup = {};
//let items = tasks;

// this.customerList = Array.from(new Set(items.map(s =>s.customerid)))
// .map(id => {
//   return {
//     customerid:id,
//     customername: items.find(s =>s.customerid === id).customername,
//     location: items.find(s =>s.customerid === id).location,
//     task_seq:items.find(s =>s.customerid === id).task_seq,
//     associatedtrip:items.find(s =>s.customerid === id).associatedtrip,
//     task_type:items.find(s =>s.customerid === id).task_type,
//     task_id:items.find(s =>s.customerid === id).id
//   };

 // });
// this.customerList = tasks.filter(el => {
//     if (items.indexOf(el.customerid) === -1) {
//         // If not present in array, then add it
//         items.push(el.id);
//         return true;
//     } else {
//         // Already present in array, don't add it
//         return false;
//     }
// });

// let result = [];
// for (let item, i = 0; item = items[i++];) {
//     debugger
//     let name = item.customername;

//   if (!(name in lookup)) {
//     lookup[name] = 1;
//     result.push(item);
//   }
// }
//this.customerList=result
    // let customerList = [...new Set(tasks.map(item => item.customername))];
//       // const taskValues = [...new Set(this.taskList)];
//console.log(this.taskList,"Task values *****",result);
    });
  }

}
