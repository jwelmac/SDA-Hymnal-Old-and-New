import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { TabHeaderIcon } from '../pages/tabs/tab-header/tab-header';

export class Searchable {
  headerIcons: TabHeaderIcon[] = [];
  searchVisible: boolean = false;
  searchHidden: boolean = !this.searchVisible;
  searchableList: any;
  searchList: any;

  constructor(){
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
    this.headerIcons.push(searchIcon);
  }

  //Set the list to be searched
  setSearchableList(list) {
    this.searchableList = list;
    this.initList();
  }

  //Initialize the hymns to display to all the hymns in the current hymnal
  initList() {
    this.searchList = this.searchableList;
  }

  //Show the search bar
  toggleSearchVisible(show) {
    this.initList(); //Reset the hymns listed
    this.searchVisible = show;
    //
    if (show) {
      this.searchHidden = false;
    }
  }

  //Show the search bar
  toggleSearchHidden() {
  }

  //Find hymns with title containing the string given
  findHymnsWithTitle(ev: any) {
    // Reset items back to all of the items
    this.initList();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.searchList = this.searchList.filter((hymn) => {
        return (hymn.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }
}
