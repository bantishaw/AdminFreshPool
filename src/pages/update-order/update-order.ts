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
    console.log(this.fetchCollection)
    this.fetchCollection.order_descriptiion.forEach(function (object) {
      object.imageStatus = object.itemStatus
    });
    console.log(this.fetchCollection)
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
        orderID: orderIdOfProduct
      }
    } else {
      updateUserOrderObject = {
        statusToBeUpdated: orderStatus,
        emailToBeSearched: email,
        uniqueKey: uniqueKeyToBeSearched,
        orderID: orderIdOfProduct,
        particularProductPrice: particularPrice
      }
    }
    console.log("updateUserOrder", updateUserOrderObject)
    this.apiProvider.updateUserOrder(updateUserOrderObject).then((data) => {
      this.updatedData = data;
      if (this.updatedData.response === 'success') {
        this.fetchCollection = this.updatedData.dataTobeShown
        this.fetchCollection.order_descriptiion.forEach(function (object) {
          object.imageStatus = object.itemStatus
        });
      } else {
        this.toastMessage(this.updatedData.data)
      }
    })
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
