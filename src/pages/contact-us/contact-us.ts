import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams,LoadingController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  dataObject : any;
  UserToContact : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public apiProvider: Api,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      cssClass: "wrapper"
    });
    loading.present();
    
    this.apiProvider.getUserListToWhomeWeHavetoContact().then((result) => {
      this.dataObject = result;
      if (this.dataObject.response === "success") {
        loading.dismiss();
        setTimeout(() => {
          this.UserToContact = this.dataObject.data;
          console.log("India"+this.UserToContact);
        
         
        }, 0)
      } else {
        loading.dismiss();
        setTimeout(() => {
          this.toastMessage(this.dataObject.data)
        }, 0)
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
