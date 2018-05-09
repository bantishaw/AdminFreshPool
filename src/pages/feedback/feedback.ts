import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams,LoadingController } from 'ionic-angular';
import { Api } from '../../providers/api/api';
/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  dataObject : any;
  feedBackList : any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
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
    
    this.apiProvider.getFeedBack().then((result) => {
      this.dataObject = result;
      if (this.dataObject.response === "success") {
        loading.dismiss();
        setTimeout(() => {
          this.feedBackList = this.dataObject.data;
          console.log("India"+this.feedBackList);
          console.log("USA"+this.feedBackList[0].feedback);
         
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
