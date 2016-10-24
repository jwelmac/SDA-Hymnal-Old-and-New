import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

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
    loadingCtrl: LoadingController,
    hymnalReader: HymnalReader
  ) {
    super (loadingCtrl, hymnalReader, "Old");
  }

}
