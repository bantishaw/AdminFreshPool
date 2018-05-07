import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { Http } from '@angular/http';
import { UpdateOrderPage } from '../update-order/update-order'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isSearchbarOperandToBeShowen = false;
  existingUser: any;
  orderDetails: any;
  currentCustomerThatUserTypeForSearch:any;
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
          this.currentCustomerThatUserTypeForSearch=this.existingUser.data;


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

  goToOrder(individualOrder) {
    this.navCtrl.push(UpdateOrderPage, { processOrder: individualOrder });
  }



  onSearch(event) {
   
    var UserNamearray = [];
    let valuethatUserTypeToSearch = event.target.value;
    if (!valuethatUserTypeToSearch) {
      this.WhenuserSearchItemAndDeleteIt();
    }
    else {
      for (var i = 0; i < this.orderDetails.length; i++) {
      UserNamearray.push(this.orderDetails[i].customerName);
      }
      if (valuethatUserTypeToSearch.trim()) {
        this.orderDetails=this.currentCustomerThatUserTypeForSearch;
        this.orderDetails = this.orderDetails.filter((topic) => {
          return ((topic.customerName.toLowerCase()).indexOf(valuethatUserTypeToSearch.toLowerCase()) !== -1);
        })
      }
    }
  }


  WhenuserSearchItemAndDeleteIt() {
    this.isSearchbarOperandToBeShowen = true;
   this.orderDetails = this.currentCustomerThatUserTypeForSearch;
 }

 onCancel() {
 
   this.isSearchbarOperandToBeShowen = false;
  this.orderDetails = this.currentCustomerThatUserTypeForSearch;
}

}
