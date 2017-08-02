import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-response',
  templateUrl: 'response.html',
})
export class ResponsePage {
  public emote: any = "";
  private emote_id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.emote = this.navParams.get('emote');
    this.emote_id = this.navParams.get('emote_id');
  }

  returnHome() {
    this.navCtrl.popToRoot();
  }

  lastAction(data) {
    if (data.action === "stuck") {
      this.navCtrl.push('AboutPage');
    } else {
      this.navCtrl.push('ResponsePage', {emote: data.action, emote_id: data.emote_id});
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
    
  }

  openHelp () {
    this.navCtrl.push("HelpPage");
  }
}
