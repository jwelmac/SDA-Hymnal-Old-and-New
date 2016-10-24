import { Component } from '@angular/core';
import { LoadingController } from 'ionic-angular';

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
    loadingCtrl: LoadingController,
    hymnalReader: HymnalReader
  ) {
    super (loadingCtrl, hymnalReader, "New");
  }

}
