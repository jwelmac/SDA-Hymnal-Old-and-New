import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHeader } from '../tabs/tab-header/tab-header';
import { HymnalReader, HymnalFaves }  from "../../providers";
import { Searchable } from "../../components";

@Component({
  templateUrl: 'favorites.html'
})
export class Favorites extends Searchable{
  currHymnal:string = 'all';
  tabHeader: TabHeader;

  constructor(
    public navCtrl: NavController,
    private reader: HymnalReader,
    private faves: HymnalFaves
  ) {
    super();
    this.tabHeader = new TabHeader("Favorites", this.headerIcons);

    //Subscribe to the searchable list
    faves.favesStream$.subscribe(favorites => this.setSearchableList(favorites));
  }

}
