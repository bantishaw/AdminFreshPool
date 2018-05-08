import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-update-order',
  templateUrl: 'update-order.html',
})
export class UpdateOrderPage {
  fetchCollection: any;
  updatedData: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: Api,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.fetchCollection = navParams.get('processOrder');
    this.fetchCollection.order_descriptiion.forEach(function (object) {
      object.imageStatus = object.itemStatus
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateOrderPage');
  }

  updateOrder(orderStatus, email, uniqueKeyToBeSearched, orderIdOfProduct, particularPrice) {
    var updateUserOrderObject = {};
    if (orderStatus !== 'Cancelled' && orderStatus !== 'Delivered') {
      updateUserOrderObject = {
        statusToBeUpdated: orderStatus,
        emailToBeSearched: email,
        uniqueKey: uniqueKeyToBeSearched,
        orderID: orderIdOfProduct,
        timeStamp: Date.now()
      }
    } else {
      updateUserOrderObject = {
        statusToBeUpdated: orderStatus,
        emailToBeSearched: email,
        uniqueKey: uniqueKeyToBeSearched,
        orderID: orderIdOfProduct,
        particularProductPrice: particularPrice,
        timeStamp: Date.now()
      }
    }
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      cssClass: "wrapper"
    });
    loading.present();
    this.apiProvider.updateUserOrder(updateUserOrderObject).then((data) => {
      this.updatedData = data;
      if (this.updatedData.response === 'success') {
        loading.dismiss();
        setTimeout(() => {
          this.toastMessage(this.updatedData.data)
          this.fetchCollection = this.updatedData.dataTobeShown
          this.fetchCollection.order_descriptiion.forEach(function (object) {
            object.imageStatus = object.itemStatus
          });
        }, 500);
      } else {
        loading.dismiss();
        setTimeout(() => {
          this.toastMessage(this.updatedData.data)
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

}
