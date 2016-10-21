import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

// Interface for declaring a icon to place in the tab header
export interface TabHeaderIcon {
  name: string, //Ionicon name
  modal?: {
    component: any, //Component to open in modal when clicked
    params: any //Parameters to pass to that component
  }
}

//Class to make a complete tab header
export class TabHeader {
  constructor (
    public title: string,
    public icons: Array<TabHeaderIcon> = []
  ){
  }
}

//Component to display tab header
@Component({
  selector: 'tab-header',
  templateUrl: 'tab-header.html'
})
export class TabHeaderComponent {
  @Input() tabHeader: TabHeader;

  constructor(public modalCtrl: ModalController) {}

  showModal(modalPage) {
    if (modalPage){
      let modal = this.modalCtrl.create(modalPage.component, modalPage.params);
      modal.present();
    } else {
      console.log("No modal set");
    }
  }
}
