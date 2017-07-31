import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  private doctorsForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.doctorsForm = this.formBuilder.group({
      zip: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  logForm() {
    console.log("Finding doctors...");
  }

  returnHome() {
    this.navCtrl.popToRoot();
  }

}
