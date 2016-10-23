import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { HymnalReader }  from "../../../providers/hymnal-reader";

@Component({
  templateUrl: 'hymn.html'
})
export class Hymn {
  hymnal: string;
  hymn: any;
  otherVerses: Array<string>;
  favorite: any;

  constructor(
    public viewCtrl: ViewController,
    navParams: NavParams,
    private reader: HymnalReader
  ) {
    this.hymn = navParams.get('hymn');
    this.otherVerses = this.getOtherVerses(this.hymn.verses);
    this.hymnal = navParams.get('from');
    this.reader.checkIsFavorite(this.hymn, this.hymnal)
               .then(isFavorite => this.favorite = isFavorite);
  }

  // Gets the other verses besides Verse 1 and the chorus
  getOtherVerses(verses: Array<any>): Array<string> {
    return Object.keys(verses).filter(key => ['1', 'chorus'].indexOf(key) == -1);
  }

  //Hide the hymn
  dismiss() {
    this.viewCtrl.dismiss();
  }

  //Favorite a hymn
  toggleFavorite() {
    this.reader.toggleFavorite(this.hymn, this.hymnal)
               .then(favorite => this.favorite = favorite);
  }

}
