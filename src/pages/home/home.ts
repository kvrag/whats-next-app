import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  splash = true;
  
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public platform: Platform
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

  openAbout () {
    this.navCtrl.push("AboutPage");
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  openVoiceInput() {
    if(this.platform.is('cordova')) {
      this.navCtrl.push("FormVoicePage");
    } else {
      this.showAlert('Voice recognition unavailable.'); 
    }
  }
}
