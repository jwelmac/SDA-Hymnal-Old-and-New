import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'hymn.html'
})
export class Hymn {
  hymnal: string;
  hymn: any;
  otherVerses: Array<string>;

  constructor(
    public viewCtrl: ViewController,
    navParams: NavParams
  ) {
    this.hymn = navParams.get('hymn');
    this.otherVerses = this.getOtherVerses(this.hymn.verses);
    this.hymnal = navParams.get('from');
  }

  // Gets the other verses besides Verse 1 and the chorus
  getOtherVerses(verses: Array<any>): Array<string> {
    return Object.keys(verses).filter(key => ['1', 'chorus'].indexOf(key) == -1);
  }

  //Hide the hymn
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
