import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController,
    private call: CallNumber
  ) {
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  async callNumber(phoneNumber):Promise<any>{
    try {
      await this.call.callNumber(phoneNumber, true);
    }
    catch(e){
      this.showAlert('Could not dial.'); 
      // would like to display number in the error box
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  returnHome() {
    this.navCtrl.popToRoot();
  }

}
