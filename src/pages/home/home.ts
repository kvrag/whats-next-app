import { Component } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http'
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private emoteForm: FormGroup;

  constructor(public http: Http, private formBuilder: FormBuilder) {
    this.emoteForm = this.formBuilder.group({
      emote: ['', Validators.required]
    });
  }

  logForm() {
    console.log("Attempting logForm")
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    let postParams = this.emoteForm.value;
    console.log(postParams)

    this.http.post("https://whatsnext-api.herokuapp.com/emotes", postParams, options)
    .subscribe(data => {
      console.log(data['_body']);
    }, error => {
      console.log(error);
    });
  }
}
