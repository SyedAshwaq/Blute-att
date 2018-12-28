import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpParams,
} from '@angular/common/http';

import { Users } from '../../interfaces/users';

import { HttpRequestService } from '../../common/services/http-request.service';
import { Observable } from 'rxjs/Observable';
import { config } from '../../common/config';
import { Observer } from 'rxjs';



@Injectable()

export class LoginService {

    getUserDetailObservable: Observable<any>;
    private getUserDetailObservableObserver: Observer<any>;
  

    constructor(private http: HttpClient,  private httpRequestService: HttpRequestService) {
        this.getUserDetailObservable = new Observable(observer =>
        this.getUserDetailObservableObserver = observer).share();

    }

    getUserDetailByObservable(){
        debugger;
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        this.getUserDetailObservableObserver.next(true);
    }

    login(emp: Users) {
        const body = {
            username: emp.email,password : emp.password
        }
        debugger;
        // return this.http.post('http://54.175.97.158:8080/api/authenticate', JSON.stringify(body))
        // .map((res: Response) =>  {return res})
        // .catch((err) =>  {return err});
            return this.httpRequestService.post('/authenticate', body);
    }

    getUserdetail(): Observable<any> {
        debugger;
        return this.httpRequestService.get('/account');
      }

    logout() {
        const body = new HttpParams();
        // return this.httpRequestService.post('/Account/Logout', body);
    }

    // forgotPassword(forgetPassword: ForgotPassword): any {

    //     // service call to be implemented
    // }



    //   getUserCapability(roleName: any): Observable<UserCapabiliy> {
    //     return this.httpRequestService.get( '/store/catalogue/GetUserCapability?RoleName=' + roleName);
    //   }


}
