import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHeader, TabHeaderIcon } from '../tabs/tab-header/tab-header';
import { NumberFind }  from "../number-find/number-find";

@Component({
  selector: 'new-hymnal-list',
  templateUrl: 'new-hymnal-list.html'
})
export class NewHymnalList {
  headerIcons: TabHeaderIcon[] = [{
    name: "keypad",
    modal: {
      component: NumberFind,
      params: {
        hymnal: "new"
      }
    }
  }];
  tabHeader: TabHeader = new TabHeader("New Hymnal", this.headerIcons);

  constructor(public navCtrl: NavController) {}

}
