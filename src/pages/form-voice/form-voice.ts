import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/map'

@IonicPage()
@Component({
  selector: 'page-form-voice',
  templateUrl: 'form-voice.html',
})

export class FormVoicePage {
  private emoteForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private formBuilder: FormBuilder) {
    this.emoteForm = this.formBuilder.group({
      emote: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormVoicePage');
  }

  voiceForm() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let postParams = this.emoteForm.value;

    this.http.post("https://whatsnext-api.herokuapp.com/emotes", postParams, options)
    .map(res => res.json())
    .subscribe(data => {
      this.navCtrl.push('ResponsePage', {emote: data.action});
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

}