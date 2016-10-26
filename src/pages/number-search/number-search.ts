import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { HymnalReader } from "../../providers/hymnal-reader";

@Component({
  templateUrl: 'number-search.html'
})
export class NumberSearch {
  hymnalType: string;
  hymnStatus: string;
  hymnNumber: string = "";
  currHymn: any;

  constructor(
    public viewCtrl: ViewController,
    private params: NavParams,
    private reader: HymnalReader
  ) {
    this.hymnalType = params.get('hymnalType');
    this.clearHymnNumber();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  openCurrHymnNumber() {
    this.reader.openHymnByNumber(this.hymnNumber, this.hymnalType);
  }

  buttonPress(event) {
    if (event){
      this.hymnNumber = this.hymnNumber+event.target.parentElement.textContent;
    }
    let result = this.reader.findHymnNumber(this.hymnNumber, this.hymnalType);
    if (result) {
      this.currHymn = result.title;
      this.hymnStatus = "success";
    } else {
      this.currHymn = "Invalid Hymn Number";
      this.hymnStatus = "danger";
    }
  }

  //Reset values to empty
  clearHymnNumber() {
    this.currHymn = "Hymn Number";
    this.hymnStatus = "primary";
    this.hymnNumber = "";
  }

  //Remove last character
  backspace() {
    this.hymnNumber = this.hymnNumber.slice(0,-1);
    // Reset if string empty
    if (this.hymnNumber.length == 0){
      this.clearHymnNumber();
    }else {
      this.buttonPress(null);
    }
  }

}
