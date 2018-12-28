import {Component} from "@angular/core";
import {IonicPage, NavController, LoadingController, ToastController, ItemSliding} from "ionic-angular";
import {Storage} from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
// import {blobToBase64} from 'blob-to-base64';
// const blobToBase64 = require('blob-to-base64')
import {SearchLocationPage} from "../search-location/search-location";
import { ExpensesProvider } from "../../providers/expenses.service";
// import {CarService} from '../../providers/car-service';
import {DomSanitizer} from '@angular/platform-browser';
import { stringify } from "@angular/compiler/src/util";
import { GlobalConfsProvider } from "../../providers/globalconfig.service";

@IonicPage({
  name: 'page-search-cars',
  segment: 'search-cars'
})

@Component({
  selector: 'page-search-cars',
  templateUrl: 'search-cars.html',
  providers: [ExpensesProvider,GlobalConfsProvider]
  
})
export class SearchCarsPage {
  // search condition
  loader:any;
  expenses:any;
  globalconfs: any
  imageURI:any;
  imageFileName:any;
  private xpenseForm : FormGroup;
  ShowxpenseForm : boolean = false;
  ExpenseInfo=[];
  imageinfo=[];
  Savebtn: boolean = true;
  Updatebtn: boolean = false;

  viewExpenseList:boolean = false;

  public search: any = {
    pickup: "Rio de Janeiro, Brazil",
    dropOff: "Same as pickup",
    from: new Date().toISOString(),
    to: new Date().toISOString()
  };

  constructor(private storage: Storage, public nav: NavController,private transfer: FileTransfer,
    private camera: Camera,
    public loadingCtrl: LoadingController,private formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public expensesProvider: ExpensesProvider,
    public gcp:GlobalConfsProvider) {
      this.xpenseForm = new FormGroup({
        expense_type: new FormControl(),
        bill_number: new FormControl(),
        amount: new FormControl(),
        bill_date: new FormControl(),
        // expenseType: new FormControl(),
        // private sanitizer:DomSanitizer
     });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
    this.xpenseForm.value.bill_date=new Date();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }


  createxpenseForm(){
    this.xpenseForm = this.formBuilder.group({
      id:0,
      expense_type:['', Validators.required],
      bill_number:['', Validators.required],
      amount:['', Validators.required],
      bill_date: ['', Validators.required],
    });
  }

  ViewForm(){
    this.createxpenseForm();
    this.ShowxpenseForm = !this.ShowxpenseForm;
    this.Updatebtn = false;
    this.Savebtn = true;
  }


  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();

    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }
  
    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
      console.log(data+" Uploaded Successfully");
      this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
      loader.dismiss();
      this.presentToast("Image uploaded successfully");
    }, (err) => {
      console.log(err);
      loader.dismiss();
      this.presentToast(err);
    });
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      
      this.imageURI = this.getFiletoBlob(imageData);;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  getFiletoBlob(imgurl){
   
              let imgBlob: any = new Blob([new Uint8Array(imgurl)],{type:'image/png'});
              
             
              return(imgBlob);
       
  }

  share(slidingItem: ItemSliding) {
    slidingItem.close();
  }

  ionViewWillEnter() {
    // this.search.pickup = "Rio de Janeiro, Brazil";
    // this.search.dropOff = "Same as pickup";
    this.storage.get('pickup').then((val) => {
      // console.log(val)
      if (val === null) {
        this.search.pickup = "Rio de Janeiro, Brazil"
      } else {
        this.search.pickup = val;
      }
      // this.search.pickup = val;
      console.log(this.search.pickup)
    }).catch((err) => {
      console.log(err)
    });

    this.storage.get('dropOff').then((val) => {
      if (val === null) {
        this.search.dropOff = "Same as pickup"
      } else {
        this.search.dropOff = val;
      }
      // this.search.dropOff = val;
    }).catch((err) => {
      console.log(err)
    });

    this.getExpenses();
    this.getGlobalConfs();
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
  }

  // choose place
  choosePlace(from) {
    this.nav.push(SearchLocationPage, from);
  }

  // go to result page
  doSearch() {
    this.nav.push('page-cars');
  }
  toBase64  (file, cb) {
let fileReader = new FileReader();
let target:EventTarget;
fileReader.readAsDataURL(file);
fileReader.onload = (e) => {
  let base64Data = fileReader.result.toString;
  let tempstr=String(fileReader.result)
  let finalresarray=tempstr.split(",")
  cb(finalresarray);
  
}
// let e=fileReader.onload() 
  // let res=
  

};
  setFileData (event) {
    let self=this;
    if (event && event.target.files && event.target.files[0]) {
    var file_1 = event.target.files[0];
    
    this.toBase64(file_1, function (base64Data) {
      // console.log(base64Data);
      var res = base64Data[0].split(":");
      var res1 = res[1].split(";");
      base64Data[0]=res1[0];
      self.imageinfo= base64Data;
    // entity[field + "ContentType"] = file_1.type;
    
    });
    }
    };
    // getblob(even){
    //   this.imageinfo=this.setFileData(even);
    //   debugger;
    // }

  saveExpenses(){
    
    let expenseItems = {
      //expense_type : this.xpenseForm.value.expense_type,
      globalconf:this.xpenseForm.value.expense_type,
      bill_number: this.xpenseForm.value.bill_number,
      amount: this.xpenseForm.value.amount,
      bill_date: this.xpenseForm.value.bill_date+"T05:43:08.761Z",
      receipt:this.imageinfo[1],
      receiptContentType:this.imageinfo[0]
      
    }
    debugger;
    // alert(expenseItems.receipt);
    debugger;
    this.expensesProvider.saveExpenses(expenseItems).subscribe(res => {
      if (res != undefined && res != null) {


        this.loader.present();

  //         setTimeout(() => {
  //           loader.dismiss();
  // }, 5000);
        this.getExpenses();
        this.ShowxpenseForm = false;
      }
    })
  
      error => {
        alert(JSON.stringify(error));
      }
  }


  showexpenseInfo(ind){
    debugger;
    //  this.OrderInfo = !this.OrderInfo;
     if(this.ExpenseInfo[ind]==true){
      this.ExpenseInfo[ind] = false;
     }else{
      this.ExpenseInfo[ind] = true;
     }
   }

  public getExpenses() {
      
    this.expensesProvider.getExpensesservice().subscribe((expenses: any) => {
      this.loader.dismiss();
      this.expenses = expenses;

      // console.log("222",this.expenses);
      for(let i=0;i<this.expenses.length;i++){
        this.ExpenseInfo[i]=false;
        // var arrayBufferView = new Uint8Array( this.expenses.receipt );
        var bytes = new Uint8Array(this.expenses.receipt );
        
        let temp="data:"+this.expenses[i].receiptContentType+";base64,"+this.expenses[i].receipt;
        // const imageUrl = URL.createObjectURL(temp);
        let reader= new FileReader();
        
        // let blob=this.base64ImageToBlob(temp);
//         console.log(typeof this.expenses[i].receipt);
// var urlCreator = window.URL ;
// var imageUrl =  URL.createObjectURL(blob);
       
        this.expenses[i].imgsrc=temp;
        // console.log("base64data",this.expenses[i].imgsrc)
//         var binaryData = [];
// binaryData.push(temp);
// const imageUrl=base64data
        // console.log(this.expenses[i].imgsrc);
        
        // blobToBase64(imgsrc1, function (error, base64) {
        //   if (!error) {
        //     this.expenses[i].imgsrc = base64;
        //   }
        // })
        
        // console.log("))))))))))))))))))))))",this.expenses[i].imgsrc);
      }
    });

  }


  getGlobalConfs(){
    this.gcp.getGlobalconfigservice().subscribe((gcp: any) => {
      this.globalconfs = gcp;
      console.log("Global Confs **",this.globalconfs);
    });
  }
  
  //  base64ImageToBlob(str) {
  //   // extract content type and base64 payload from original string
  //   var pos = str.indexOf(';base64,');
  //   var type = str.substring(5, pos);
  //   var b64 = str.substr(pos + 8);
  
  //   // decode base64
  //   var imageContent = atob(b64);
  
  //   // create an ArrayBuffer and a view (as unsigned 8-bit)
  //   var buffer = new ArrayBuffer(imageContent.length);
  //   var view = new Uint8Array(buffer);
  
  //   // fill the view, using the decoded base64
  //   for(var n = 0; n < imageContent.length; n++) {
  //     view[n] = imageContent.charCodeAt(n);
  //   }
  
  //   // convert ArrayBuffer to Blob
  //   var blob = new Blob([buffer], { type: type });
  
  //   return blob;
  // }
  editExpenses(expense){
    debugger;
    this.xpenseForm = this.formBuilder.group({
      id:0,
      expense_type:['', Validators.required],
      bill_number:['', Validators.required],
      amount:['', Validators.required],
      bill_date: ['', Validators.required],
    });

    this.xpenseForm.controls['id'].setValue(expense.id);
    this.xpenseForm.controls['expense_type'].setValue(expense.globalconf.expense_type);
    this.xpenseForm.controls['bill_number'].setValue(expense.bill_number);
    this.xpenseForm.controls['amount'].setValue(expense.amount);
    this.xpenseForm.controls['bill_date'].setValue(expense.bill_date);

    this.ShowxpenseForm = true;
    this.Updatebtn = true;
    this.Savebtn = false;
  }


  updateExpenses(){
    debugger;
    let expenseItems = {
      // globalconf:{expense_type:this.xpenseForm.value.expense_type,
      id:this.xpenseForm.value.id,
      expense_type : this.xpenseForm.value.expense_type,
      bill_number: this.xpenseForm.value.bill_number,
      amount: this.xpenseForm.value.amount,
      bill_date: this.xpenseForm.value.bill_date,
      receipt:this.imageinfo[1],
      receiptContentType:this.imageinfo[0],
      gcp:this.globalconfs
    }

    this.expensesProvider.updateExpenses(expenseItems).subscribe(res => {
      this.loader.present();
      this.ShowxpenseForm = false;
      this.getExpenses();
    })
    
      error => {
        alert(JSON.stringify(error));
      }
  }

  showExpenseList(){
    this.viewExpenseList = !this.viewExpenseList;
  }


}
