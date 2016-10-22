import { Component } from '@angular/core';

import { NewHymnal } from '../hymnal/new-hymnal';
import { OldHymnal } from '../hymnal/old-hymnal';
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
  public tabs: TabInterface[] = [
    {title: "Favorites", icon: "heart", component: Favorites},
    {title: "New Hymnal", icon: "ios-bookmarks", component: NewHymnal},
    {title: "Old Hymnal", icon: "ios-book", component: OldHymnal}
  ];

  constructor() {}
}
