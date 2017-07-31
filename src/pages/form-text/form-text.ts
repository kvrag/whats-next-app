import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-form-text',
  templateUrl: 'form-text.html',
})
export class FormTextPage {
  private emoteForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public http: Http) {
     this.emoteForm = this.formBuilder.group({
      emote: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormTextPage');
  }

  logForm() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let postParams = this.emoteForm.value;

    this.http.post("https://whatsnext-api.herokuapp.com/emotes", postParams, options)
    .map(res => res.json())
    .subscribe(data => {
      this.navCtrl.push('LoadingPage');
      setTimeout(function() {
        this.navCtrl.push('ResponsePage', {emote: data.action});
      }.bind(this), 7000);
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  returnHome() {
    this.navCtrl.popToRoot();
  }
}
