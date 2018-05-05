import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { Http, Headers } from '@angular/http';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  existingUser: any;
  email: string;
  password: string;
  constructor(
    private menu: MenuController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public apiProvider: Api,
    public http: Http,
    public loadingCtrl: LoadingController) { }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }
  
  doLogin() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var userObject = {
      email: this.email,
      password: this.password
    }
    if (!userObject.email) {
      this.toastMessage("Email address cannot be empty")
    } else if (!userObject.password) {
      this.toastMessage("Password cannot be empty")
    } else {
      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        cssClass: "wrapper"
      });
      loading.present();
      this.apiProvider.userLogin(userObject).then((data) => {
        this.existingUser = data;
        if (this.existingUser.response === 'success') {
          loading.dismiss();
          setTimeout(() => {
            this.navCtrl.push(HomePage);
          }, 500);
        } else {
          loading.dismiss();
          setTimeout(() => {
            this.toastMessage(this.existingUser.data)
          }, 500);
        }
      })
    }
  }

  toastMessage(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'middle',
      cssClass: 'showToast'
    });
    toast.present();
  }
}