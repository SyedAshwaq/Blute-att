import {Component} from '@angular/core';
import {IonicPage, NavController, MenuController, ItemSliding, NavParams, ModalController, LoadingController} from 'ionic-angular';

import {MessageService} from '../../providers/message-service-mock';
import { TaskProvider } from '../../providers/tasks.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Customer } from '../../interfaces/customer';
import { ProductDetail } from '../../interfaces/product';
import { TasksItems } from '../../interfaces/task';
import { CustomerProvider } from '../../providers/customer-service';
import { ProductProvider } from '../../providers/product-service';
import { SignaturePage } from '../signature/signature';
import { Geolocation } from '@ionic-native/geolocation';
import {CarService} from '../../providers/car-service';
import { timestamp } from 'rxjs/operator/timestamp';

@IonicPage({
	name: 'page-message-list',
	segment: 'message-list'
})

@Component({
    selector: 'page-message-list',
    templateUrl: 'message-list.html',
    providers:[CustomerProvider,ProductProvider]
    // providers:[CarService]
})
export class MessageListPage {

  loader:any;
  tasks: any;
  DeliveryTasks: any;
  PickupTasks: any;
  products:any;
  deliveries:any;
  customer:any;
  lat: any;
  lng:any;
  isChecked: Boolean[];
  errormessage: boolean = false;
  PickupType :any;
  DeliveryType :any;
  CompletedStatus :any;
  DeliveryTaskCompletedCount : number;
  PickupTaskCompletedCount:number;
  private taskForm : FormGroup;
  showList: boolean = false;
  private selectedTask:any;
  showCustomerList: boolean = false;
  showProductList: boolean = false;

  Updatebtn: boolean = true;
  Savebtn: boolean = false;
  validateUpdate : boolean = false;
  showEditList: boolean = false;
  showDeliveryEditList : boolean = false;

  ProductInfo = [];
  OrderInfo= [];
  CustomerInfo=[];

  viewShopDetails=[];
  seltasks=[];
  searchQuery: string = '';
  customers: string[];

  //customerList: [];
//  customerList: Customer[];

  productList: ProductDetail[];
  tasksItems : {};
  isCollapse:boolean[];
  isSignature:boolean;


  public signatureImage : any;
  subscription: any;
  tasktypename : any;
  productListnew: ProductDetail[];
  cust:any=[];
  deliverySelectAll: boolean;
  pickupSelectAll: boolean;
  deliComment: any;
 

    constructor(public navCtrl: NavController, 
        public service: MessageService,
        private taskProvider: TaskProvider,
        private customerProvider: CustomerProvider,
        private productProvider: ProductProvider,
        private formBuilder: FormBuilder,
        public menuCtrl: MenuController,
        public navParams:NavParams,
        public modalController:ModalController,
        public geo: Geolocation,
        private CS:CarService,
      
        public loadingCtrl: LoadingController) {
            this.menuCtrl.swipeEnable(true, 'authenticated');
            this.menuCtrl.enable(true);
            this.isSignature = false;
           
            this.signatureImage=this.CS.getSign();
            debugger;
            this.subscription = this.CS.reloadGetTaskObervable.subscribe(
              result  => this.getTasks());
              this.PickupType = 'PICKUP';
              this.DeliveryType = 'DELIVERY';
              this.CompletedStatus = 'COMPLETED';
              this.customer = this.navParams.get("customer");
              console.log("Nav Pram", this.navParams.get("customer"), this.customer);
              console.log("selected customer", this.customer);
    }

    ionViewDidLoad(){
      // this.customer = this.navParams.get("customer");
            console.log("Nav Pram", this.navParams.get("customer"), this.customer);
      this.geo.getCurrentPosition().then(pos =>{
        this.lat = pos.coords.latitude;
        this.lng = pos.coords.longitude;
        localStorage.setItem('lat',this.lat);
        localStorage.setItem('lng',this.lng);
        
      }).catch(err => 
        console.log(err));
    }

    openSignatureModel(){
      // setTimeout(() => {
      //    let modal = this.modalController.create(SignaturePage,{tsk:this.seltasks});

      // modal.present();
      
      // }, 300);
      this.navCtrl.push(SignaturePage,{tsk:this.seltasks})
  
    }
    
    share(slidingItem: ItemSliding) {
      slidingItem.close();
    }
    ionViewWillEnter() {
      debugger;
     
      this.getTasks();
      this.initializeProducts();
      this.signatureImage=this.CS.getSign();
      this.loader = this.loadingCtrl.create({
        content: "Loading..."
      });
     
    }

   
    createTaskForm(){
      this.taskForm = this.formBuilder.group({
        id:0,
        product_name:['', Validators.required],
        quantity:['', Validators.required],
        comments: ['', Validators.required],
        task_type:this.PickupType,
        orderid:[''],
        challanid:[''],
        status:['INPROGRESS']
      });
    }
   
   viewTaskForm(){
     this.showList = true;
     this.Updatebtn = false;
     this.Savebtn = true;
     this.createTaskForm();
   }
  
   showProductInfo(ind){
    //  this.ProductInfo = !this.ProductInfo;
    if(this.ProductInfo[ind]==true){
      this.ProductInfo[ind] = false;
     }else{
      this.ProductInfo[ind] = true;
     }
   }
  
   editTask(task){
    this.taskForm = this.formBuilder.group({
      
      id:0,
      // customername:['', Validators.required],
      product_name:['', Validators.required],
      quantity:['', Validators.required],
      comments: ['', Validators.required],
      task_type:[''],
      orderid:[''],
      challanid:[''],
      status:[''],
      customername:[''],
      customerid:[''],
      location:[''],
      associatedtrip:[''],
      task_seq:[''],
      assignee:['']
    });
    this.selectedTask=task;
    //  console.log(task);
    this.showEditList = true;
    this.taskForm.controls['id'].setValue(task.id);
    this.taskForm.controls['customername'].setValue(task.customername);
    this.taskForm.controls['customerid'].setValue(task.customerid);
    this.taskForm.controls['product_name'].setValue(task.product_name);
    this.taskForm.controls['quantity'].setValue(task.quantity);
    this.taskForm.controls['comments'].setValue(task.comments);
    this.taskForm.controls['task_type'].setValue(task.task_type);
    this.taskForm.controls['orderid'].setValue(task.orderid);
    this.taskForm.controls['challanid'].setValue(task.challanid);
    this.taskForm.controls['status'].setValue(task.status);
    this.taskForm.controls['task_seq'].setValue(task.task_seq);
    this.taskForm.controls['associatedtrip'].setValue(task.associatedtrip);
    this.taskForm.controls['location'].setValue(task.location),
    this.taskForm.controls['assignee'].setValue(task.assignee)


    this.Updatebtn = true;
    this.Savebtn = false;
   }

   CloseEditList(){
    this.showEditList = false;
   }
  
   showOrderInfo(ind, ptask){
    console.log(this.isSignature);
    ptask.OrderInfo=!ptask.OrderInfo;
    // this.OrderInfo[ind]= !this.OrderInfo[ind];

   }
   public getTasks() {
     this.taskProvider.getTaskservice().subscribe((restasks: any) => {
        this.tasks                        = [];
        this.tasks                        = this.customer.tasks;
        this.tasks.OrderInfo=false;
        console.log("Tasks", this.tasks, this.customer.tasks)
        // filter for delivery task
        this.DeliveryTasks                = [];
        this.DeliveryTasks                = this.tasks.filter(a =>a.task_type == this.DeliveryType);
        this.DeliveryTaskCompletedCount   = this.DeliveryTasks.filter(a=>a.status == this.CompletedStatus).length;
        console.log("Delivery Completed Count ", this.DeliveryTaskCompletedCount);
        if(this.DeliveryTaskCompletedCount == this.DeliveryTasks.length)
        {
          this.deliverySelectAll = false;
        }
        else
        {
          this.deliverySelectAll = true;

        }
        if (this.DeliveryTasks.length != 0)
        {
            this.SetTaskAttributes(this.DeliveryTasks)
        }
        //Filter for Pickup Tasks
        this.PickupTasks                  = [];
        this.PickupTasks                  = this.tasks.filter(a =>a.task_type == this.PickupType);
       
        this.PickupTaskCompletedCount     = this.PickupTasks.filter(a=>a.status == this.CompletedStatus).length;
        console.log(this.PickupTaskCompletedCount,"LLLLLLLLLLLLLLLLLLLLLLLLL",this.PickupTasks);
        if(this.PickupTaskCompletedCount == this.PickupTasks.length)
        {
          this.pickupSelectAll = false;
        }
        else
        {
          this.pickupSelectAll = true;

        }

        if (this.PickupTasks.length != 0)
        {
          this.SetTaskAttributes(this.PickupTasks)
        }


        // restasks.forEach(element => {
        //   if(element.customerid == localStorage.getItem('customerid')){
        //       this.tasks.push(element)
        //   }
        console.log(this.PickupTasks,"LLLLLLLLLLLLLLLLLLLLLLLLL",this.pickupSelectAll)
        });
        
        // if(this.loader){ 
        //   this.loader.dismiss(); 
        //   this.loader = null; 
        // }
       
     };
    
  SelectAll(MarkTasks)
  {
    if (MarkTasks.length > 0)
    {
      for (let i = 0; i < MarkTasks.length; i++)
      {
        this.addItems(MarkTasks[i])
      }
      console.log(">>>>>>>>>>>>>>>>>>>>",this.seltasks);
    }
  }

  SetTaskAttributes (tasks)
  {
    for(let i = 0;  i < tasks.length;  i++){
      this.OrderInfo[i]        = false;
      tasks[i].isChecked       = false;

      if (tasks[i].task_type == this.DeliveryType)
        {
          tasks[i].isVisible = true;
          tasks[i].ispickupVisible = false;
        }                       
      else
        {
          tasks[i].isVisible = false;
          tasks[i].ispickupVisible = true;
        }
    
        if (tasks[i].createdBy == localStorage.getItem('username'))
          {
            if ((tasks[i].status != this.CompletedStatus) && (tasks[i].task_type == this.PickupType))
            {
              tasks[i].isEditable = true;
            }
            else
            {
              tasks[i].isEditable = false;
            }
          } 
        else
        {
          tasks[i].isEditable = false;
        }

        if (tasks[i].status == this.CompletedStatus)
        {
          tasks[i].ShowImage = true;
          tasks[i].ShowCheck = false;
        }
      else
        {
          tasks[i].ShowImage = false;
          tasks[i].ShowCheck = true;
        }
      }
  }
  saveDeli(task){
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
debugger;
// task.comments=this.deliComment;
task.customerid=this.customer.customerId;
task.customername=this.customer.customerName;
console.log(task,this.customer)
    this.taskProvider.updateTask(task).subscribe(res => {
      if (res != undefined && res != null) {
          task.OrderInfo=false;
          // this.getTasks();
          if(this.loader){ this.loader.dismiss(); this.loader = null; }
      }
    })
  
      error => {
        if(this.loader){ this.loader.dismiss(); this.loader = null; }
        alert(JSON.stringify(error));
      }
  }
  saveTask(){

    if (this.taskForm.value.quantity <= 0)
    {
      this.errormessage = true;
    }
    else{
      this.errormessage = false;
    }
    console.log(this.customer);
debugger;
    let tasksItems = {
      assignee:           localStorage.getItem('username'),
      challanid :         this.taskForm.value.challanid,
      comments:           this.taskForm.value.comments,
      customer_contact:   this.taskForm.value.customer_contact,
      customerid:         this.customer.customerId,
      customername:       this.customer.customerName,
      customer_sign_link: this.taskForm.value.customer_sign_link,
      customer_sign_time: this.taskForm.value.customer_sign_time,
      expected_time:      this.taskForm.value.expected_time,
      instructions:       this.taskForm.value.instructions,
      orderid:            this.taskForm.value.orderid,
      product_name:       this.taskForm.value.product_name,
      quantity:           this.taskForm.value.quantity,
      route:              this.taskForm.value.route,
      status:             this.taskForm.value.status,
      task_type:          this.taskForm.value.task_type,
      location:           this.customer.customerLocation,
      associatedtrip:     this.customer.tripId,
      task_seq:           this.customer.taskSeq,

    }
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
debugger;
    this.taskProvider.saveTask(tasksItems).subscribe(res => {
      if (res != undefined && res != null) {
          this.showList = false;
         
          this.customer.tasks.push(res);
           this.getTasks();
          console.log(this.customer)
          if(this.loader){ this.loader.dismiss(); this.loader = null; }
      }
    })
  
      error => {
        if(this.loader){ this.loader.dismiss(); this.loader = null; }
        alert(JSON.stringify(error));
      }
  }
  addItems(ta){
    console.log("Select All", ta);
    if(ta.status=='COMPLETED'){
      return
    }else{
    if(ta.isChecked   ==  false){
      ta.isChecked=true;
      this.seltasks.push(ta);
    }else{
      ta.isChecked=false;
      
      let po=this.seltasks.indexOf(ta);
      this.seltasks.splice(po);
      
    }
    if(this.seltasks.length>0)
      {
        this.isSignature = true;
      }
      else{
        this.isSignature = false;
      }
    }
      console.log("IIIIIIIIIIIIIIIIII",this.seltasks)
  }


  updateTask(){
    let tasksItems = {
      assignee:                 this.taskForm.value.assignee,
      challanid :               this.taskForm.value.challanid,
      comments:                 this.taskForm.value.comments,
      customerid:               this.taskForm.value.customerid,
      customername:             this.taskForm.value.customername,
      location:                 this.taskForm.value.location,
      associatedtrip:           this.taskForm.value.associatedtrip,
      task_seq:                 this.taskForm.value.task_seq,
      orderid:                  this.taskForm.value.orderid,
      product_name:             this.taskForm.value.product_name,
      quantity:                 this.taskForm.value.quantity,
      status:                   this.taskForm.value.status != null && this.taskForm.value.status != ""? this.taskForm.value.status : "INPROGRESS",
      task_type:                this.taskForm.value.task_type,
      id:                       this.taskForm.value.id
    }
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present().then;
    this.taskProvider.updateTask(tasksItems).subscribe(res => {
      // this.loader.dismiss();
      if(this.loader){ this.loader.dismiss(); this.loader = null; }
      this.showEditList = false;
      debugger;
      this.customer.tasks.forEach(element => {
        if(element.id==res.id){
          debugger;
          element.product_name=res.product_name;
          element.quantity=res.quantity;
          element.comments=res.comments;
          // element.quantity=res.quantity;
        }
      });
      // let tempObj = this.customer.tasks.filter(ele => ele.location.country === res.id);

      // this.customer.tasks.push(res);
      // this.getTasks();
      // this.getTasks();
    })
    
      error => {
        // this.loader.dismiss();
        if(this.loader){ this.loader.dismiss(); this.loader = null; }
        alert(JSON.stringify(error));
      }
  }
  
  
  deleteTask(task) {
    this.taskProvider.deleteTask(task.id).subscribe(res => {
      debugger;
      this.getTasks();
    })
    
      error => {
        alert(JSON.stringify(error));
      }
  
  }

  showShopInfo(ind){
    debugger;
    if(this.viewShopDetails[ind]==true){
      this.viewShopDetails[ind] = false;
    }else{
      this.viewShopDetails[ind] = true;
    }
   }
  
  
  // public initializeCustomers() {
  //   this.customerProvider.getCustomers().subscribe((customer: any) => {
  //     this.customerList = customer;
      
  //   });
  // }
  
  getCustomers(ev: any) {
    // Reset items back to all of the items
  //  this.initializeCustomers();
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      // this.customerList = this.customerList.filter((res) => {
      //   return (res.customer_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // });
      // Show the results
      this.showCustomerList = true;
    } else {
      // hide the results when the query is empty
      this.showCustomerList = false;
    }
  }
  
  selectCustomerName(ev:any){
    this.taskForm.controls['customername'].setValue(ev.customer_name);
    this.showCustomerList = false;
  }
  
  public initializeProducts() {
    this.productProvider.getProducts().subscribe((products: any) => {
    this.productList = products;
    const appresult = this.productList.filter(a =>  a.pdtype == 'PICKUP');
    this.productList = appresult;
    console.log("products",appresult);

    });
  }
  
  getProducts(ev: any) {
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // Filter the items
      this.productListnew = this.productList.filter((res) => {
        return (res.pdvalue.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      // Show the results
      this.showProductList = true;
    } else {
      // hide the results when the query is empty
      this.showProductList = false;
    }
  }
  
  selectProductName(ev:any){
    this.taskForm.controls['product_name'].setValue(ev.pdvalue);
    this.showProductList = false;
  }

  CloseForm(){
    this.showList = false;
  }


  editDeliveryTask(task){
    this.taskForm = this.formBuilder.group({
      
      id:0,
      // customername:['', Validators.required],
      product_name:['', Validators.required],
      quantity:['', Validators.required],
      comments: ['', Validators.required],
      task_type:[''],
      orderid:[''],
      challanid:[''],
      status:[''],
      customername:[''],
      customerid:[''],
      location:[''],
      associatedtrip:[''],
      task_seq:[''],
      assignee:['']
    });
    this.selectedTask=task;
    //  console.log(task);
    this.showDeliveryEditList = true;
    this.taskForm.controls['id'].setValue(task.id);
    this.taskForm.controls['customername'].setValue(task.customername);
    this.taskForm.controls['customerid'].setValue(task.customerid);
    this.taskForm.controls['product_name'].setValue(task.product_name);
    this.taskForm.controls['quantity'].setValue(task.quantity);
    this.taskForm.controls['comments'].setValue(task.comments);
    this.taskForm.controls['task_type'].setValue(task.task_type);
    this.taskForm.controls['orderid'].setValue(task.orderid);
    this.taskForm.controls['challanid'].setValue(task.challanid);
    this.taskForm.controls['status'].setValue(task.status);
    this.taskForm.controls['task_seq'].setValue(task.task_seq);
    this.taskForm.controls['associatedtrip'].setValue(task.associatedtrip);
    this.taskForm.controls['location'].setValue(task.location),
    this.taskForm.controls['assignee'].setValue(task.assignee)


    this.Updatebtn = true;
   }

   CloseDeliveryList(){
    this.showDeliveryEditList = false;
   }


}
