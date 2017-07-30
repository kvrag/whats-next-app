import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http'
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private emote: FormGroup;

  constructor(public http: Http, private formBuilder: FormBuilder) {
    this.emote = this.formBuilder.group({
      emote: ['', Validators.required]
    });
  }

  logForm() {
    console.log("Attempting logForm")
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let postParams = this.emote.value;
  }

}
