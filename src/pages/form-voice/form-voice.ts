import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import 'rxjs/add/operator/map'

@IonicPage()
@Component({
  selector: 'page-form-voice',
  templateUrl: 'form-voice.html',
})

export class FormVoicePage {
  private emoteForm: FormGroup;
  public recordingContent: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    private formBuilder: FormBuilder,
    private speechRecognition: SpeechRecognition
  ) {
    this.emoteForm = this.formBuilder.group({
      emote: ['', Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormVoicePage');
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
  }

  stopListening() {
    this.speechRecognition.stopListening();
    this.speechRecognition.stopListening();
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
