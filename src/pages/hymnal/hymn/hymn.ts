import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'hymn.html'
})
export class Hymn {
  hymnal: string;
  hymn: any;
  verses: Array<string>;

  constructor(
    public viewCtrl: ViewController,
    navParams: NavParams
  ) {
    this.hymn = navParams.get('hymn');
    this.verses = Object.keys(this.hymn.verses);
    this.hymnal = navParams.get('from');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
