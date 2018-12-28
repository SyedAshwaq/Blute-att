import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
// import { AuthService } from './auth/auth.service';
import { config } from '../config';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  loginUrl: string;
  constructor( private Config:config) {
    this.loginUrl = Config.base_url + '/Account/Login';
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    debugger;


    

    if ( localStorage.getItem('token') != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });

      debugger;
      console.log('in', request);
    } else {
      // request = request.clone({ headers: request.headers.set('Content-Type', 'application/x-www-form-urlencoded') });
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }
debugger
    console.log(request);
    return next.handle(request);
  }
}
