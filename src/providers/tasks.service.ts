import { Injectable }         from '@angular/core';
import { HttpClient }         from '@angular/common/http';
import { Observable }         from 'rxjs/Observable';
import { HttpRequestService } from '../common/services/http-request.service';
import { TasksItems }         from '../interfaces/task';

@Injectable()
export class TaskProvider {
  apiKey =                '1e4a0bdb251c64e4';
  url:                    string;
  queryNotFound:          string;
  body:                   string;
  routeList:              any;

  constructor(public http: HttpClient, private httpRequestService:HttpRequestService) {
    this.url            = '/tasks/'
   
  }

  getTaskservice(): Observable<TasksItems> {
    debugger;
    let url            = '/tasksGroupByCustomer/' + localStorage.getItem("username");
    return this.httpRequestService.get(url).map(res => {
      return res;
    });
    
  }
 
  amAvailableservice(data): Observable<TasksItems> {
    debugger;
    let url            = '/trackusers/';
    return this.httpRequestService.post(url,data).map(res => {
      return res;
    });
    
  }

  mapAsTaskViewModel(res) {
    return res.map(item => {
 
      let TasksItems=item;
      
  return TasksItems;
    });
  }

  // Private
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError (error: Response | any) {
    let errMsg:             string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  
  saveTask(tsk) {
        
    debugger;
    return this.httpRequestService.post(this.url, tsk);
}
 
updateTask(tsk) {
  const body = {
    assignee:                   tsk.assignee,
    challanid :                 tsk.challanid,
    comments:                   tsk.comments,
    customer_contact:           tsk.customer_contact,
    customerid:                 tsk.customerid,
    customername:               tsk.customername,
    customer_sign:              tsk.customer_sign,
    customer_sign_link:         tsk.customer_sign_link,
    customer_sign_time:         tsk.customer_sign_time,
    expected_time:              tsk.expected_time,
    instructions:               tsk.instructions,
    location:                   tsk.location,
    orderid:                    tsk.orderid,
    product_name:               tsk.product_name,
    quantity:                   tsk.quantity,
    route:                      tsk.route,
    status:                     tsk.status,
    task_seq:                   tsk.task_seq,
    task_type:                  tsk.task_type,
    id:                         tsk.id,
    associatedtrip:             tsk.associatedtrip,
    customer_signContentType:   tsk.customer_signContentType
  }
  debugger;
   return this.httpRequestService.put(this.url, body);
}

deleteTask(tsk: number) {
      
      return this.httpRequestService.delete(this.url +"/" + tsk);
  }
}
