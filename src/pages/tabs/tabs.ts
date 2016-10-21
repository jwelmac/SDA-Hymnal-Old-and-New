import { Component } from '@angular/core';

import { NewHymnalList } from '../new-hymnal/new-hymnal-list';
import { OldHymnalList } from '../old-hymnal/old-hymnal-list';
import { Favorites } from '../favorites/favorites';

export interface TabInterface {
  title: string,
  icon: string,
  component: any
}

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  public tabs: TabInterface[] = [
    {title: "New Hymnal", icon: "ios-bookmarks", component: NewHymnalList},
    {title: "Old Hymnal", icon: "ios-book", component: OldHymnalList},
    {title: "Favorites", icon: "heart", component: Favorites}
  ];

  constructor() {

  }
}
