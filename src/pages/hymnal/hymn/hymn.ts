import { Component, Input } from '@angular/core';

export interface Hymn {
	number: number|string,
	title: string,
	verses: any
}

@Component({
  selector: 'hymn',
  templateUrl: 'hymn.html'
})
export class HymnDetail {
  @Input() hymn: any;
  otherVerses: Array<string>;

  constructor() {

  }

	ionViewWillLoad(){
		this.otherVerses = this.getOtherVerses(this.hymn.verses);
	}
  // Gets the other verses besides Verse 1 and the chorus
  getOtherVerses(verses: Array<any>): Array<string> {
    return Object.keys(verses).filter(key => ['1', 'chorus'].indexOf(key) == -1);
  }
}
