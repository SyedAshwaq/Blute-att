import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Http, Request, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { config } from '../config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpRequestService {

  baseAppUrl: string;
  routeList: { 'id': string; 'name': string; }[];
  private static json(res: Response): any {
    return res;
  }

  constructor(  private httpClient: HttpClient, private Config:config) {

    this.baseAppUrl = Config.base_url;
  }

  get(url: string): Observable<any> {
    url = this.baseAppUrl + url;
    debugger;
    return this.httpClient.get(url)
      .map((res: Response) => HttpRequestService.json(res))
      .catch(this.handleError);
  }

  post(url: string, data: any): Observable<any> {
    debugger;
    url = this.baseAppUrl + url;
    return this.httpClient.post(url, JSON.stringify(data))
      .map((res: Response) => HttpRequestService.json(res))
      .catch(this.handleError);
  }

  put(url: string, data: any): Observable<any> {
    url = this.baseAppUrl + url;
    return this.httpClient.put(url, JSON.stringify(data) )
      .map((res: Response) => HttpRequestService.json(res))
      .catch(this.handleError);
  }

  postFormEncoded(url: string, data: any): Observable<any> {
    url = this.baseAppUrl + url;
    return this.httpClient.post(url, (data))
      .map((res: Response) => HttpRequestService.json(res) )
      .catch(this.handleError) ;

  }
  search(url: string, params: string): Observable<any> {
    if ( params != undefined && params !='' && params != null && params !=" ") {
      url = url + '?query=' + params;
    }
    url = this.baseAppUrl + url;
    return this.httpClient.get(url)
      .map((res: Response) => HttpRequestService.json(res))
      .catch(this.handleError);
  }
  private handleError(error: HttpErrorResponse) {
    debugger
    let errMsg: string;
    // if (error instanceof Response) {
    //   const body = error.json() || '';
    //   const err = body.error || JSON.stringify(body);
    //   errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    // } else {
    //   errMsg = error.message ? error.message : error.toString();
    // }
    // return HttpRequestService.json(error)
    return Observable.throw(error);

  }


  delete(url: string): Observable<any> {
    debugger;
    url = this.baseAppUrl + url;
    return this.httpClient.delete(url)
      .map((res: Response) => HttpRequestService.json(res))
      .catch(this.handleError);
  }



  // getRoutes() {
  //   debugger;
  //  // url = this.baseAppUrl + url;
  //    this.routeList =[
  //     {
  //       'id':'1','name':'chennai-bangalore'
  //     },
  //     {
  //       'id':'2','name':'bangalore-mysore',
  //     },
  //     {
  //       'id':'3','name':'mangalore-bangalore',
  //     }
  //   ]

  //   return this.routeList;
  // }
}
