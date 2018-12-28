import { JwtHelper  } from 'angular2-jwt';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelper) {}
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    try {
        if (this.jwtHelper) {
        this.jwtHelper = new JwtHelper();
        return !this.jwtHelper.isTokenExpired(token);
        }
    } catch (e) {
  return false;
    }
}
  }
