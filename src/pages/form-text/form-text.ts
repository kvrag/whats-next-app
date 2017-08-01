import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-form-text',
  templateUrl: 'form-text.html',
})
export class FormTextPage {
  private emoteForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private nativePageTransitions: NativePageTransitions, public http: Http) {
     this.emoteForm = this.formBuilder.group({
      emote: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormTextPage');
  }

  openPage(page) {

    let options: NativeTransitionOptions = {
        direction: 'up',
        duration: 500,
        slowdownfactor: 3,
        slidePixels: 20,
        iosdelay: 100,
        androiddelay: 150,
        fixedPixelsTop: 0,
        fixedPixelsBottom: 60
    };

    this.nativePageTransitions.slide(options);
    this.navCtrl.push(page);

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
      this.openPage('LoadingPage');
      this.navCtrl.push('LoadingPage');
      setTimeout(function() {
        this.navCtrl.push('ResponsePage', {emote: data.action});
      }.bind(this), 12000);
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  returnHome() {
    this.navCtrl.popToRoot();
  }
}
