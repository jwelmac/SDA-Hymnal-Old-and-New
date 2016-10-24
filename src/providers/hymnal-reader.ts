import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ModalController } from 'ionic-angular';

import { Hymn } from "../pages/hymnal/hymn/hymn";

@Injectable()
export class HymnalReader {
  public hymnalTypes = ["old", "new"];
  private hymnalUrl = 'assets/hymnals/';

  constructor(
    private http: Http,
    private modalCtrl: ModalController,
  ) {}

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

  //Open a hymn selected
  openHymn(hymn: any, hymnalType: string) {
    let modal = this.modalCtrl.create(Hymn, {hymn: hymn, from: hymnalType});
    console.log("Opening Hymn:", hymn);
    modal.present();
  }

}
