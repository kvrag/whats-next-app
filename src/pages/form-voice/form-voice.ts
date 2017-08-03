import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { Device } from '@ionic-native/device';
import 'rxjs/add/operator/map'

@IonicPage()
@Component({
  selector: 'page-form-voice',
  templateUrl: 'form-voice.html',
})

export class FormVoicePage {
  private emoteForm: FormGroup;
  public recordingContent: string;
  private deviceId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private formBuilder: FormBuilder,
    private speechRecognition: SpeechRecognition,
    private device: Device,
    private platform: Platform
  ) {
    this.emoteForm = this.formBuilder.group({
      emote: ['', Validators.required]
    });
    this.deviceId = this.device.uuid;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad FormVoicePage');
    this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => console.log(available));
    this.speechRecognition.requestPermission()
      .then(
      () => console.log('Granted'),
      () => console.log('Denied')
      );
  }

  startListening() {
    this.speechRecognition.startListening()
      .subscribe(
      (matches: Array<string>) => this.recordingContent = matches[0],
      (onerror) => console.log('error:', onerror)
      );

    if(this.platform.is('ios')) {
//logic for the button changing to a stop button goes here
    }
  }

  stopListening() {
    this.speechRecognition.stopListening();
  }

  voiceForm() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let postParams = this.emoteForm.value;
    postParams['uuid'] = this.deviceId;
    
    this.navCtrl.push('LoadingPage');

    this.http.post("https://unstuck-api-staging.herokuapp.com/emotes", postParams, options)
    .map(res => res.json())
    .subscribe(data => {
      setTimeout(function() {
        this.navCtrl.push('ResponsePage', {emote: data.action, emote_id: data.emote_id, uuid: this.deviceId});
      }.bind(this), 6000);
      console.log(data);
      console.log(this.deviceId);
      console.log(postParams);
    }, error => {
      console.log(error);
    });
  }

  returnHome() {
    this.navCtrl.popToRoot();
  }


}
