import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { api } from './config';
import { Observable } from 'rxjs/Observable';
// import { map, catchError } from 'rxjs/operators';
import { HttpRequestService } from '../common/services/http-request.service';
import { ExpensesItems } from '../interfaces/expenses';

@Injectable()
export class ExpensesProvider {
  apiKey = '1e4a0bdb251c64e4';
  url: string;
  queryNotFound: string;
  body:string;
  routeList: any;

  constructor(public http: HttpClient, private httpRequestService:HttpRequestService) {
   
    this.url = '/expenses'
    // this.body=localStorage.getItem('token');
  }

  getExpensesservice(): Observable<ExpensesItems> {
    debugger;
    return this.httpRequestService.get(this.url).map(res => {
      return res;
    });
  }

  // Private
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  

  saveExpenses(expense) {
    let body={
    globalconf: expense.globalconf,
    receipt:expense.receipt,
    receiptContentType:expense.receiptContentType,
    id: expense.id,
    bill_number: expense.bill_number,
    amount: expense.amount,
    bill_date: expense.bill_date,
    createdBy: localStorage.getItem('username'),
    createdDate: new Date,
  }
        debugger;
        return this.httpRequestService.post(this.url, body);
}

updateExpenses(expense){
  // const globalconf={
  //   default_value: 0,
  //   expense_type: PETROL,
  //   id: 0
  // }
  // let globalconf=this.httpRequestService.get('/globalconfs');
  console.log(expense.gcp);
  let gcp=expense.gcp.filter(itm => itm.expense_type == expense.expense_type);
  console.log(gcp);
  const body = {
    globalconf: {expense_type:expense.expense_type,
      default_value: 0,
      id:gcp[0].id
    },
    id: expense.id,
    bill_number: expense.bill_number,
    amount: expense.amount,
    bill_date: expense.bill_date,
    createdBy: expense.createdBy,
    createdDate: expense.createdDate,
  }
      
      debugger;
      return this.httpRequestService.put(this.url, body);
}

}
