import { NavController, ItemSliding, LoadingController, ModalController } from 'ionic-angular';

import { TabHeader, TabHeaderIcon } from '../tabs/tab-header/tab-header';
import { NumberSearch }  from "../number-search/number-search";
import { HymnalReader } from "../../providers/hymnal-reader";
import { Hymn } from "./hymn/hymn";

export class Hymnal {
  headerIcons: TabHeaderIcon[];
  tabHeader: TabHeader;
  hymnal: any;

  constructor(
    public navCtrl: NavController,
    loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    hymnalReader: HymnalReader,
    private hymnalType: string
  ) {

    // Show loading spinner
    let loading = loadingCtrl.create({
      content: "Loading Hymnal..."
    });
    loading.present();

    // Load hymn after short delay to allow loading indicator to show
    setTimeout(() => {
      hymnalReader.loadHymnal(hymnalType.toLowerCase())
                  .then(hymnal => {
                    this.hymnal = hymnal;
                    loading.dismiss();
                  })
                  .catch(err => console.error(err));
    }, 200);

    this.headerIcons = [{
      name: "keypad",
      modal: {
        component: NumberSearch,
        params: {
          hymnal: hymnalType
        }
      }
    }];


    this.tabHeader = new TabHeader(hymnalType+" Hymnal", this.headerIcons);
  }

  //Open a hymn selected
  openHymn(hymn) {
    let modal = this.modalCtrl.create(Hymn, {hymn: hymn, from: this.hymnalType});
    console.log("Opening Hymn:", hymn);
    modal.present();
  }

  //Set hymn as favorite
  favorite(num: number, item: ItemSliding) {
    console.log("Favoriting "+this.hymnalType+" Hymnal Song #"+num);
    item.close();
  }
}
