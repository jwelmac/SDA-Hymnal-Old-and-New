import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';

import { HymnalReader } from "../../providers/hymnal-reader";
import { Hymnal }  from "./hymnal";
/**
New hymnal constructor
*/
@Component({
  templateUrl: 'hymnal.html'
})
export class NewHymnal extends Hymnal {

  constructor(
    public navCtrl: NavController,
    loadingCtrl: LoadingController,
    modalCtrl: ModalController,
    hymnalReader: HymnalReader
  ) {
    super (navCtrl, loadingCtrl, modalCtrl, hymnalReader, "New");
  }

}
