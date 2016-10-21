import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { UCFirst } from "../pipes/uc-first";

@Component({
  selector: 'page-number-find',
  templateUrl: 'number-find.html'
})
export class NumberFind {
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
