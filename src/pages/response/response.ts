import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Device } from '@ionic-native/device';

@IonicPage()
@Component({
  selector: 'page-response',
  templateUrl: 'response.html',
})
export class ResponsePage {
  public emote: any = "";
  private emote_id: any;
  private deviceId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private device: Device) {
    this.emote = this.navParams.get('emote');
    this.emote_id = this.navParams.get('emote_id');
    this.deviceId = this.device.uuid;
  }

  returnHome() {
    this.navCtrl.popToRoot();
  }

  lastAction(data) {
    if (data.action === "stuck") {
      this.navCtrl.push('AboutPage');
    } else {
      this.navCtrl.push('ResponsePage', {emote: data.action, emote_id: data.emote_id, uuid: data.deviceId});
    }
  }

  getAnother() {
    this.navCtrl.push('LoadingPage');
    setTimeout(function() {
      this.emote = this.http.get("https://unstuck-api-staging.herokuapp.com/emotes/" + this.emote_id)
      .map(res => res.json())
      .subscribe(data => {
        setTimeout(function() {
          this.lastAction(data);
        }.bind(this), 6000);
      })
    }.bind(this), 1000);
  }

  ionViewDidLoad() {
    // console.log(this.deviceId);
  }

  openHelp () {
    this.navCtrl.push("HelpPage");
  }
}
