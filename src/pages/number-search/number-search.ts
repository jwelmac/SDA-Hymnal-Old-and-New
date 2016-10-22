import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'number-search.html'
})
export class NumberSearch {
  hymnal: string;

  constructor(
    public viewCtrl: ViewController,
    private params: NavParams
  ) {
    this.hymnal = params.get('hymnal');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
