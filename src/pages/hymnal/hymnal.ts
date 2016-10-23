import { NavController, ItemSliding, LoadingController, ModalController } from 'ionic-angular';

import { TabHeader, TabHeaderIcon } from '../tabs/tab-header/tab-header';
import { NumberSearch }  from "../number-search/number-search";
import { HymnalReader } from "../../providers/hymnal-reader";
import { Hymn } from "./hymn/hymn";

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class Hymnal {
  tabHeader: TabHeader;
  hymnal: any;
  hymns: any;
  searchVisible: boolean = false;

  constructor(
    public navCtrl: NavController,
    loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private hymnalReader: HymnalReader,
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
                    this.initHymns();
                    loading.dismiss();
                  })
                  .catch(err => console.error(err));
    }, 200);

    this.initTabHeader();
  }

  //Initialize the tab header
  initTabHeader() {
      //Tab Header Icons
      let keypadIcon: TabHeaderIcon = {
        name: "keypad",
        action:{
          modal: {
            component: NumberSearch,
            params: {
              hymnal: this.hymnalType
            }
          }
        }
      };

      // Create Observable source and subscribe to its stream to detect button press
      let searchSubject =  new BehaviorSubject<boolean>(this.searchVisible);
      searchSubject.asObservable().subscribe(show => this.toggleSearch(show));

      //Search icon
      let searchIcon: TabHeaderIcon = {
        name: "search",
        action: {
          event: {
            subject: searchSubject,
            value: true
          }
        }
      };

      //Create tab header
      this.tabHeader = new TabHeader(this.hymnalType+" Hymnal", [searchIcon, keypadIcon]);
  }

  //Initialize the hymns to display to all the hymns in the current hymnal
  initHymns() {
    this.hymns = this.hymnal;
  }

  //Open a hymn selected
  openHymn(hymn: any) {
    let modal = this.modalCtrl.create(Hymn, {hymn: hymn, from: this.hymnalType});
    console.log("Opening Hymn:", hymn);
    modal.present();
  }

  //Show the search bar
  toggleSearch(show) {
    this.initHymns(); //Reset the hymns listed
    this.searchVisible = show;
  }

  //Find hymns with title containing the string given
  findHymnsWithTitle(ev: any) {
    // Reset items back to all of the items
    this.initHymns();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.hymns = this.hymns.filter((hymn) => {
        return (hymn.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
}
