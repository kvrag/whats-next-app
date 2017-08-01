import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public speechAvailable: boolean = false;

  splash = true;

  constructor(public navCtrl: NavController, private speechRecognition: SpeechRecognition) {
 
  }
  
  public checkSpeechAvailability() {
    this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => this.speechAvailable = available)
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


  openVoiceInput() {
    this.navCtrl.push("FormVoicePage");
  }
}
