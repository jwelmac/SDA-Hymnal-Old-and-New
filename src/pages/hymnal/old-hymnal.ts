import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';

import { HymnalReader } from "../../providers/hymnal-reader";
import { Hymnal }  from "./hymnal";
/**
Old hymnal constructor
*/
@Component({
  templateUrl: 'hymnal.html'
})
export class OldHymnal extends Hymnal {

  constructor(
    public navCtrl: NavController,
    loadingCtrl: LoadingController,
    modalCtrl: ModalController,
    hymnalReader: HymnalReader
  ) {
    super (navCtrl, loadingCtrl, modalCtrl, hymnalReader, "Old");
  }

}
