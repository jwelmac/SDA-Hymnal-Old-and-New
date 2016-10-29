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
  midi: any = {
    root: "assets/media/midi/",
    title: "",
    exists: false,
    path: ""
  };

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
      this.initMidi();
      console.log("Title: "+this.midi.title+" exists - "+this.midi.exists);
  }

  initMidi() {
    this.midi.title = this.getMidiTitle(this.hymn);
    this.midi.path = this.midi.root+this.midi.title+".mid";
    this.midi.exists = this.midiExists(this.midi.path);
  }

  //Get the title of the midi file
  getMidiTitle(hymn): string {
    //Get title in lowercase
    //Remove punctuation [",", "!", "?"] and Replace special characters ["'", "-", " "] with _
    return hymn.title.toLowerCase()
                     .replace(/[,!\?]/g, "")
                     .replace(/[,-\s]/g,"_");
  }

  midiExists(path): boolean {
    if(path){
        let req = new XMLHttpRequest();
        req.open('HEAD', path, false);
        req.send();
        return req.status==200;
    } else {
        return false;
    }
  }

  //Play the hymn midi
  playHymn() {
    console.log("Playing Midi");
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
