import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { Http } from '@angular/http';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  existingUser: any;
  orderDetails: any;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController,
    public apiProvider: Api, public loadingCtrl: LoadingController, public http: Http) {

  }

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      cssClass: "wrapper"
    });
    loading.present();
    this.apiProvider.getAdminNewOrders().then((data) => {
      this.existingUser = data;
      if (this.existingUser.response === 'success') {
        loading.dismiss();
        setTimeout(() => {
          this.orderDetails = this.existingUser.data;
        }, 500);
      } else {
        loading.dismiss();
        setTimeout(() => {
          this.toastMessage(this.existingUser.data)
        }, 500);
      }
    })
  }

  toastMessage(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'middle',
      cssClass: 'showToast'
    });
    toast.present();
  }

  doRefresh(refresher) {
    this.ionViewDidEnter();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
}
