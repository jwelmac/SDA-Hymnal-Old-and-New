import { Component, ViewChild } from '@angular/core';
import { ViewController, NavParams, Slides } from 'ionic-angular';
import { Hymn, HymnMidi }  from ".";
import { HymnalFaves, HymnalReader }  from "../../../providers";

@Component({
  templateUrl: 'hymn-view.html'
})
export class HymnView {
  hymnal: string;
  reader: HymnalReader;
  firstLoad: boolean;
  //Hymns
  currHymn: Hymn;
  hymns: Array<Hymn> = [];
  totalHymnSlides: number = 3;
  //Current hymn properties
  favorite: any;
  midi: HymnMidi;
  //Pointers
  prevIndex: number;
  currIndex: number;
  //Options
  hymnSliderOptions: any = {
    initialSlide: 1,
    loop: true
  };

  constructor(
    public viewCtrl: ViewController,
    navParams: NavParams,
    private faves: HymnalFaves
  ) {
	  let initIndex = this.hymnSliderOptions.initialSlide;
      this.hymns[initIndex] = navParams.get('hymn');
      this.hymnal = navParams.get('from');
      this.reader = navParams.get('reader');
      this.initCurrHymn(initIndex, false);
      [
        initIndex+1, //Set prev bigger i.e. moving backward, setting slide to left in loop
        initIndex-1  //Set prev smaller i.e. moving forward, setting slide to right in loop
      ].forEach(value => {
        this.prevIndex = value;
        this.setNextHymn(initIndex);
      });
      this.firstLoad = true;
      console.log("Hymns: ", this.hymns);
  }

  //Hide the hymn
  dismiss() {
    this.viewCtrl.dismiss();
  }

  //Initialize the current hymn
  initCurrHymn(index: number, setOthers: boolean = true){
	  this.currHymn = this.hymns[index];
	  this.faves.checkIsFavorite(this.currHymn, this.hymnal)
                .then(isFavorite => this.favorite = isFavorite);
    this.midi = new HymnMidi(this.currHymn);
    if (setOthers){
     this.setNextHymn(index);
     this.prevIndex = index;
   }
  }

  //Change the active hymns
  changeHymns(slider){
    if (!this.firstLoad){
        this.prevIndex = slider.previousIndex-1;
        this.initCurrHymn(slider.activeIndex-1);
    } else {
        this.firstLoad = false;
    }
  }

  //Set the other hymns
  setNextHymn(currIndex: number){
      //Did we move forward or back
      let forward = this.wasSlidForward(currIndex);
      let hymnIndex = this.getLoopIndex(this.currHymn.number, this.hymnalLegth(this.hymnal), forward, true),
          hymn = this.reader.findHymnNumber(hymnIndex, this.hymnal),
          slideIndex = this.getLoopIndex(currIndex, this.totalHymnSlides, forward);
      //Update next hymn in direction swiped to be displayed
      this.hymns[slideIndex] = hymn;
  }

  //Check if slides went forward
  wasSlidForward(currIndex: number): boolean{
      let lastIndex = this.totalHymnSlides-1;
      if(lastIndex > 1 && this.prevIndex === 0) {
          //Not the last index
          return currIndex !== lastIndex;
      } else if (lastIndex > 1 && this.prevIndex === lastIndex){
          //The first index
          return currIndex === 0;
      } else {
          //Index number increased
          return currIndex > this.prevIndex;
      }
  }

  //Previous number in loop
  getLoopIndex(
    currIndex: number|string,
    length: number,
    next: boolean,
    hymnNumber: boolean = false
  ){
      currIndex = (typeof currIndex === "string" ? parseInt(currIndex) : currIndex);
    	currIndex = hymnNumber ? currIndex-1 : currIndex;
    	let prev = (currIndex + (next ? length+1 : length-1)) % length;
      return hymnNumber ? prev+1 : prev;
  }

  hymnalLegth(hymnal): number {
    return this.reader.hymnals[hymnal.toLowerCase()].length;
  }

  //Play the hymn midi
  playHymn() {
    if(this.midi.playing) {
  		  this.midi.player.pause();
  	} else if(this.midi.player.pauseTime == -1) { //Not paused yet
  		  this.midi.player.play(() => console.log('Play ended'));
  	} else { //Paused
  		  this.midi.player.resume();
  	}
    //Switxh status
    this.midi.playing = !this.midi.playing;
  }

  //Favorite a hymn
  toggleFavorite() {
    this.faves.toggleFavorite(this.currHymn, this.hymnal)
              .then(favorite => this.favorite = favorite);
  }

}
