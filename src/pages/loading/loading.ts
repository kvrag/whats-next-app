import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // removeLoadingPage() {
  //   this.navCtrl.pop();
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadingPage');
    //setTimeout(this.removeLoadingPage, 5000);
  }

}
