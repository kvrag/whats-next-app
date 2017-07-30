import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
// import { ResponsePage } from '../response/response';
import 'rxjs/add/operator/map';
import { Device } from '@ionic-native/device'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  private emoteForm: FormGroup;
  public deviceId: any;

  constructor(public http: Http, public navCtrl: NavController, private formBuilder: FormBuilder, private device: Device) {
    this.emoteForm = this.formBuilder.group({
      emote: ['', Validators.required]
    });
    this.deviceId  = this.device.uuid;
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
      this.navCtrl.push('ResponsePage', {emote: data.action});
      console.log(data);
    }, error => {
      console.log(error);
    });
  }
}
