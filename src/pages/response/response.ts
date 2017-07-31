import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-response',
  templateUrl: 'response.html',
})
export class ResponsePage {
  public emote: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.emote = this.navParams.get('emote');
  }

  returnHome() {
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {

  }

  openHelp () {
    this.navCtrl.push("HelpPage");
  }
}
