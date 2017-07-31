import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormVoicePage } from './form-voice';

@NgModule({
  declarations: [
    FormVoicePage,
  ],
  imports: [
    IonicPageModule.forChild(FormVoicePage),
  ],
})
export class FormVoicePageModule {}
