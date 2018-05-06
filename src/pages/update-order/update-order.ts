import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-update-order',
  templateUrl: 'update-order.html',
})
export class UpdateOrderPage {
  fetchCollection: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.fetchCollection = navParams.get('processOrder');
    console.log(this.fetchCollection)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateOrderPage');
  }

}
