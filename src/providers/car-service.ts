import {Injectable, Output, EventEmitter} from "@angular/core";
import { Observable, Observer } from "rxjs";
// import {CARS} from "../mocks/mock-cars";

@Injectable()
export class CarService {
  private signature: any;
 

  reloadGetTaskObervable: Observable<any>;
  private reloadGetTasksobserver: Observer<any>;

  constructor() {
    this.signature= {img:'dummy'};
    this.reloadGetTaskObervable = new Observable(observer =>
      this.reloadGetTasksobserver = observer).share();
  }

  reloadGetTask(){
    this.reloadGetTasksobserver.next(true);
  }
  
  getAll() {
    return this.signature;
  }

  setSign(sign) {
    debugger;
    this.signature=sign;
  }
  getSign() {
    return this.signature;
  }

  getItem(id) {
    for (var i = 0; i < this.signature.length; i++) {
      if (this.signature[i].id === parseInt(id)) {
        return this.signature[i];
      }
    }
    return null;
  }

  remove(item) {
    this.signature.splice(this.signature.indexOf(item), 1);
  }
  
}
