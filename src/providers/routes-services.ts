import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { api } from './config';
import { Observable } from 'rxjs/Observable';
// import { map, catchError } from 'rxjs/operators';
import { HttpRequestService } from '../common/services/http-request.service';

@Injectable()
export class RoutesProvider {
  apiKey = '1e4a0bdb251c64e4';
  url: string;
  queryNotFound: string;
  body:string;
  routeList: any;

  constructor(public http: HttpClient, private httpRequestService:HttpRequestService) {
   
    this.url = '/routeinfos'
    // this.body=localStorage.getItem('token');
  }

  getRoutesService(): Observable<any[]>{
    debugger;
  return this.httpRequestService.get(this.url);
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


}
