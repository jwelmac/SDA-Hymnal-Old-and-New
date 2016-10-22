import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HymnalReader {
  private hymnalTypes = ["old", "new"];
  private hymnalUrl = 'assets/hymnals/';

  constructor(public http: Http) {}

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

}
