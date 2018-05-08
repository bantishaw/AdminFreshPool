import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Header } from 'ionic-angular/components/toolbar/toolbar-header';

@Injectable()
export class Api {
  url: string = 'http://localhost:8080/userRegistration';
  data: any;
  settingsInformation: any;
  shoppingCartData: any;
  constructor(public http: Http) {
    this.data = null;
  }

  userLogin(userObject) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('https://immense-river-69583.herokuapp.com/getLogin', userObject, { headers: headers })
        .subscribe(res => {
          this.settingsInformation = res.json();
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  getAdminNewOrders() {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.get('https://immense-river-69583.herokuapp.com/getAdminNewOrders', { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  updateUserOrder(updateUserOrderObject) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('https://immense-river-69583.herokuapp.com/updateUserOrder',updateUserOrderObject, { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

}