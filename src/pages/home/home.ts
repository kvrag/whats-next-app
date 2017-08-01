import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  splash = true;

  constructor(public navCtrl: NavController) {
 
  }

  ionViewDidLoad() {
    setTimeout(() => this.splash = false, 4000);
  }

  openInput() {
    this.navCtrl.push("FormTextPage");
  };

  openHelp () {
    this.navCtrl.push("HelpPage");
  }
  openVoiceInput() {
    this.navCtrl.push("FormVoicePage");
  }
}
