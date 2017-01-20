import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { Hymn, HymnMidi }  from "../../components";
import { HymnalFaves }  from "../../providers/hymnal-faves";
import { HymnalReader }  from "../../providers/hymnal-reader";

@Component({
  selector: 'hymn-view',
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
  initIndex = 1;
  hymnSliderOptions: any = {
    initialSlide: this.initIndex+1 //The middle slide in array of hymns
  };

  constructor(
    public viewCtrl: ViewController,
    navParams: NavParams,
    private faves: HymnalFaves
  ) {
      this.hymns[this.initIndex] = navParams.get('hymn');
      this.hymnal = navParams.get('from');
      this.reader = navParams.get('reader');
      this.initCurrHymn(this.initIndex, false);
      [
        this.initIndex+1, //Set prev bigger i.e. moving backward, setting slide to left in loop
        this.initIndex-1  //Set prev smaller i.e. moving forward, setting slide to right in loop
      ].forEach(value => {
        this.prevIndex = value;
        this.setNextHymn(this.initIndex);
      });
      this.firstLoad = true;
      console.log("Hymns: ", this.hymns);
  }

  /**
  * Hide the hymn view
  **/
  dismiss() {
    this.viewCtrl.dismiss();
  }

  //Initialize the current hymn
  initCurrHymn(index: number, setOthers: boolean = true){
	  this.currHymn = this.hymns[index];
    this.currHymn.otherVerses = this.getOtherVerses(this.currHymn.verses);
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
      //Slider: 0 |1 2 3| 4 -> Prev index always between ||
      //Hymns:  2 |0 1 2| 0 -> curr index always between ||
        //Slider index starts at 1 not 0
        this.prevIndex = slider.previousIndex-1;
        let currIndex = slider.activeIndex == 0
          ? this.totalHymnSlides-1 //Loop to end
          : slider.isEnd ? 0 : slider.activeIndex-1;
        this.initCurrHymn(currIndex);

        //Go to item in loop
        if(slider.isEnd){
          slider.slideTo(1, 0, false);
        } else if (slider.isBeginning) {
          slider.slideTo(this.totalHymnSlides, 0, false);
        }
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
          //Is it not the last index
          return currIndex !== lastIndex;
      } else if (lastIndex > 1 && this.prevIndex === lastIndex){
          //Is it the first index
          return currIndex === 0;
      } else {
          //Did the index number increase
          return currIndex > this.prevIndex;
      }
  }

  //Next number in sequnece in loop
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

  // Gets the other verses besides Verse 1 and the chorus
  getOtherVerses(verses: Array<any>): Array<string> {
    return Object.keys(verses).filter(key => ['1', 'chorus'].indexOf(key) == -1);
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
