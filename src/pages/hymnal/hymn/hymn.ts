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
  @Input('hymn') hymn: any;
  @Input('hymnal') hymnal: string;
  otherVerses: Array<string>;

  constructor() {
      this.otherVerses = this.getOtherVerses(this.hymn.verses);
  }

  // Gets the other verses besides Verse 1 and the chorus
  getOtherVerses(verses: Array<any>): Array<string> {
    return Object.keys(verses).filter(key => ['1', 'chorus'].indexOf(key) == -1);
  }
}
