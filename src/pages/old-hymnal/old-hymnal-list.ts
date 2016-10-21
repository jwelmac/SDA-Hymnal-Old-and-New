import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHeader, TabHeaderIcon } from '../tabs/tab-header/tab-header';
import { NumberFind }  from "../number-find/number-find";

@Component({
  selector: 'old-hymnal-list',
  templateUrl: 'old-hymnal-list.html'
})
export class OldHymnalList {
  headerIcons: TabHeaderIcon[] = [{
    name: "keypad",
    modal: {
      component: NumberFind,
      params: {
        hymnal: "old"
      }
    }
  }];
  tabHeader: TabHeader = new TabHeader("Old Hymnal", this.headerIcons);

  constructor(public navCtrl: NavController) {}

}
