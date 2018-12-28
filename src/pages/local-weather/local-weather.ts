import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController,ItemSliding } from 'ionic-angular';
import {TaskProvider } from '../../providers/tasks.service';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TasksItems } from '../../interfaces/task';
import { CustomerProvider } from '../../providers/customer-service';
import { Customer } from '../../interfaces/customer';
import { Product } from '../../interfaces/product';
import { ProductProvider } from '../../providers/product-service';

// import {FormModalComponent} from '../form-modal/form-modal'

@IonicPage({
  name: 'page-local-weather',
  segment: 'local-weather',
  priority: 'high'
})

@Component({
  selector: 'page-local-weather',
  templateUrl: 'local-weather.html',
  providers:[CustomerProvider,ProductProvider]
})
export class LocalWeatherPage {
  tasks: any;

  private taskForm : FormGroup;
  showList: boolean = false;

  showCustomerList: boolean = false;
  showProductList: boolean = false;

  Updatebtn: boolean = true;
  Savebtn: boolean = false;
  validateUpdate : boolean = false;
  ProductInfo = [];
  OrderInfo= [];
  CustomerInfo=[];
  searchQuery: string = '';
  customers: string[];

  customerList: Customer[];
  productList: Product[];
  tasksItems : TasksItems;
  

  constructor(
    public navCtrl: NavController,
    private taskProvider: TaskProvider,
    private customerProvider: CustomerProvider,
    private productProvider: ProductProvider,
    private formBuilder: FormBuilder,
    public menuCtrl: MenuController
    ) {
      this.menuCtrl.swipeEnable(true, 'authenticated');
      this.menuCtrl.enable(true);
      this.createTaskForm();

  }
  share(slidingItem: ItemSliding) {
    slidingItem.close();
  }
  ionViewWillEnter() {
    this.getTasks();
    this.initializeCustomers();
    this.initializeProducts();
  }

  createTaskForm(){
    this.taskForm = this.formBuilder.group({
      id:0,
      customername:['', Validators.required],
      product_name:['', Validators.required],
      quantity:['', Validators.required],
      comments: ['', Validators.required],
    });
  }
 
 viewTaskForm(){
   this.showList = !this.showList;
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
  this.showList = !this.showList;

  
  // this.taskForm.controls['assignee'].setValue(task.assignee);
  // this.taskForm.controls['challanid'].setValue(task.challanid);
  // this.taskForm.controls['customer_contact'].setValue(task.customer_contact);
  // this.taskForm.controls['customer_contact'].setValue(task.customer_contact);
  // this.taskForm.controls['customer_id'].setValue(task.customer_id);
  // this.taskForm.controls['customer_name'].setValue(task.customer_name);
  // this.taskForm.controls['customer_sign_link'].setValue(task.customer_sign_link);
  // this.taskForm.controls['customer_sign_time'].setValue(task.customer_sign_time);
  // this.taskForm.controls['expected_time'].setValue(task.expected_time);
  // this.taskForm.controls['instructions'].setValue(task.instructions);
  // this.taskForm.controls['location'].setValue(task.location);
  // this.taskForm.controls['orderid'].setValue(task.orderid);
  // this.taskForm.controls['product_name'].setValue(task.product_name);
  // this.taskForm.controls['route'].setValue(task.route);
  // this.taskForm.controls['status'].setValue(task.status);
  // this.taskForm.controls['task_seq'].setValue(task.task_seq);
  // this.taskForm.controls['task_type'].setValue(task.task_type);

  this.taskForm.controls['id'].setValue(task.id);
  this.taskForm.controls['customername'].setValue(task.customer_name);
  this.taskForm.controls['product_name'].setValue(task.productdesc);
  this.taskForm.controls['quantity'].setValue(task.quantity);
  this.taskForm.controls['comments'].setValue(task.comments);

  this.Updatebtn = true;
  this.Savebtn = false;
 }

 showOrderInfo(ind){
  //  this.OrderInfo = !this.OrderInfo;
debugger;
   if(this.OrderInfo[ind]==true){
    this.OrderInfo[ind] = false;
   }else{
    this.OrderInfo[ind] = true;
   }
 }

 showCustomerInfo(ind){
   

   if(this.CustomerInfo[ind]==true){
    this.CustomerInfo[ind] = false;
   }else{
    this.CustomerInfo[ind] = true;
   }

   this.Updatebtn = false;
   this.Savebtn = true;
 }



  public getTasks() {
    
    this.taskProvider.getTaskservice().subscribe((tasks: any) => {
      console.log('**************',tasks);
      this.tasks = tasks;
      for(let i=0;i<this.tasks.length;i++){
        this.CustomerInfo[i]=false;
        this.OrderInfo[i]= false;
        this.ProductInfo[i]= false;
      }
      
    });

  }
  public createTasks() {
    this.taskProvider.getTaskservice().subscribe((tasks: any) => {
      this.tasks = tasks;
    });
  }

saveTask(){
  debugger;
  this.tasksItems = {
    assignee: '',
    challanid: '',
    comments: '',
    customer_contact: '',
    customer_id: '',
    customername: '',
    customer_sign_link: '',
    customer_sign_time: new Date,
    expected_time: new Date,
    id: 0,
    instructions: '',
    location: '',
    orderid: '',
    product_name: '',
    quantity: 0,
    route: '',
    status: '',
    task_seq: 0,
    task_type: ''
  }
  this.taskProvider.saveTask(this.taskForm.value).subscribe(res => {
    
    if (res != undefined && res != null) {
      this.showList = false;
      this.getTasks();
    }
  })

    error => {
      console.log(error);
    }
}

updateTask(){
  this.taskProvider.updateTask(this.taskForm.value).subscribe(res => {
    this.showList = false;
    this.getTasks();
  })
  
    error => {
      console.log(error);
    }
}


deleteTask(task) {
  this.taskProvider.deleteTask(task.id).subscribe(res => {
    this.getTasks();
  })
  
    error => {
      console.log(error);
    }

}


public initializeCustomers() {
  debugger;
  this.customerProvider.getCustomers().subscribe((customers: any) => {
    console.log("********** customers",customers);
    this.customerList = customers;
  });
}

getCustomers(ev: any) {
  // Reset items back to all of the items
  this.initializeCustomers();
  // set val to the value of the searchbar
  let val = ev.target.value;
  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    // Filter the items
    this.customerList = this.customerList.filter((res) => {
      return (res.customer_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
    // Show the results
    this.showCustomerList = true;
  } else {
    // hide the results when the query is empty
    this.showCustomerList = false;
  }
}

selectCustomerName(ev:any){
  debugger;
  this.taskForm.controls['customername'].setValue(ev.customer_name);
  this.showCustomerList = false;
}

public initializeProducts() {
  debugger;
  this.productProvider.getProducts().subscribe((products: any) => {
    this.productList = products;
  });
}

getProducts(ev: any) {
  // Reset items back to all of the items
  this.initializeCustomers();
  // set val to the value of the searchbar
  let val = ev.target.value;
  // if the value is an empty string don't filter the items
  if (val && val.trim() != '') {
    // Filter the items
    this.productList = this.productList.filter((res) => {
      return (res.productdesc.toLowerCase().indexOf(val.toLowerCase()) > -1);
    });
    // Show the results
    this.showProductList = true;
  } else {
    // hide the results when the query is empty
    this.showProductList = false;
  }
}

selectProductName(ev:any){
  debugger;
  this.taskForm.controls['product_name'].setValue(ev.productdesc);
  this.showProductList = false;
}


}
