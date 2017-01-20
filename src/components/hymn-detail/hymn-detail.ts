import { Component, Input } from '@angular/core';
import { Hymn } from '../hymn';

@Component({
  selector: 'hymn',
  templateUrl: 'hymn-detail.html'
})
export class HymnDetail {
  @Input() hymn: Hymn;

  constructor() {}

	ngOnInit(){
		console.log('Hymn', this.hymn);
	}
}
