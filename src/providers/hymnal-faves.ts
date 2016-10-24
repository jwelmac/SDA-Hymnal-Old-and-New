import { Injectable } from '@angular/core';

import { Storage }  from "@ionic/storage";

@Injectable()
export class HymnalFaves {
  public favorites: Array<any>;

  constructor(private storage: Storage,) {
      // Set the storage name
      storage._db.config({
        name : 'SDA_Hymnal',
        storeName   : 'Favorites'
      });
      // Load favorites
      this.loadFavorites();
  }

  //Add or remove hymn as favorite
  toggleFavorite(hymn: any, hymnal: string): Promise<any>{
    let hymn_key = hymnal.toLowerCase()+'_'+hymn.number;
    return new Promise((resolve, reject) => {
      this.checkIsFavorite(hymn, hymnal).then(isFavorite => {
        isFavorite ? this.storage.remove(hymn_key).then(() => this.loadFavorites())
                   : this.storage.set(hymn_key, hymn).then(() => this.loadFavorites());
        resolve(!isFavorite);
      });
    });
  }

  //Check if hymn is a favorite
  checkIsFavorite(hymn: any, hymnal: string): Promise<any> {
    let hymn_key = hymnal.toLowerCase()+'_'+hymn.number;
    return new Promise((resolve, reject) => {
      this.storage.get(hymn_key)
                  .then(present => resolve(present ? true : false));
    });
  }

  //Load the favorites from storage
  loadFavorites() {
    this.favorites = [];
    this.storage.forEach((value, key) => {
      value.hymnal = key.split("_")[0].toLowerCase();
      this.favorites.push(value);
      console.log("Favorites: ", this.favorites);
    });
  }


}
