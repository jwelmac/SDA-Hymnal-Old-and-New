import { LoadingController } from 'ionic-angular';

import { TabHeader, TabHeaderIcon } from '../tabs/tab-header/tab-header';
import { NumberSearch }  from "../number-search/number-search";
import { HymnalReader } from "../../providers/hymnal-reader";
import { Searchable } from "../../components/searchable";

export class Hymnal extends Searchable{
  tabHeader: TabHeader;
  hymnal: any;

  constructor(
    loadingCtrl: LoadingController,
    private hymnalReader: HymnalReader,
    private hymnalType: string
  ) {
    super(); //Set the hymnal to searchable
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
                    this.setSearchableList(hymnal);
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
              hymnalType: this.hymnalType.toLowerCase()
            }
          }
        }
      };
      this.headerIcons.push(keypadIcon);
      //Create tab header
      this.tabHeader = new TabHeader(this.hymnalType+" Hymnal", this.headerIcons);
  }

}
