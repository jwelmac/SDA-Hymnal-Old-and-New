import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { HymnalFaves }  from "../../../providers/hymnal-faves";

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
    private faves: HymnalFaves
  ) {
    this.hymn = navParams.get('hymn');
    this.otherVerses = this.getOtherVerses(this.hymn.verses);
    this.hymnal = navParams.get('from');
    this.faves.checkIsFavorite(this.hymn, this.hymnal)
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
    this.faves.toggleFavorite(this.hymn, this.hymnal)
              .then(favorite => this.favorite = favorite);
  }

}
