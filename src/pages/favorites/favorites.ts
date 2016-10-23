import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHeader, TabHeaderIcon } from '../tabs/tab-header/tab-header';

@Component({
  templateUrl: 'favorites.html'
})
export class Favorites {
  headerIcons: TabHeaderIcon[] = [];
  tabHeader: TabHeader = new TabHeader("Favorites", this.headerIcons);

  constructor(public navCtrl: NavController) {}

}
