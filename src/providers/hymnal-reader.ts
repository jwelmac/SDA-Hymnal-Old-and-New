import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage }  from "@ionic/storage";
import 'rxjs/add/operator/map';

@Injectable()
export class HymnalReader {
  private hymnalTypes = ["old", "new"];
  private hymnalUrl = 'assets/hymnals/';
  public favorites;


  constructor(
    private http: Http,
    private storage: Storage
  ) {
    // Set the storage name
    storage._db.config({
      name : 'SDA_Hymnal',
      storeName   : 'Favorites'
    });
  }

  loadHymnal(type) {
    return new Promise((resolve, reject) => {
      if (this.hymnalTypes.indexOf(type) > -1){
          this.http.get(this.hymnalUrl+type+".json")
                   .map(res => res.json())
                   .subscribe(data => resolve(data),
                              err => reject(err));
      } else {
          reject("No hymnal of that type present");
      }
    });
  }

  //Add or remove hymn as favorite
  toggleFavorite(hymn: any, hymnal: string): Promise<any>{
    let hymn_key = hymnal+'_'+hymn.number;
    return new Promise((resolve, reject) => {
      this.checkIsFavorite(hymn, hymnal).then(isFavorite => {
        isFavorite ? this.storage.remove(hymn_key)
                   : this.storage.set(hymn_key, hymn);
        resolve(!isFavorite);
      });
    });
  }

  //Check if hymn is a favorite
  checkIsFavorite(hymn: any, hymnal: string): Promise<any> {
    let hymn_key = hymnal+'_'+hymn.number;
    return new Promise((resolve, reject) => {
      this.storage.get(hymn_key)
                  .then(present => resolve(present ? true : false));
    });
  }

}
