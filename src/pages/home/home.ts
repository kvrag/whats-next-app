import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  
  splash = true;
  
  constructor(
    public navCtrl: NavController,
    public platform: Platform,
  ) {
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
    if(this.platform.is('cordova')) {
      this.navCtrl.push("FormVoicePage");
    }
  }
}
