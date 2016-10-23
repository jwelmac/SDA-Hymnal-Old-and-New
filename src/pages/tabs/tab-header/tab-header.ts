import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';

// Interface for declaring a icon to place in the tab header
export interface TabHeaderIcon {
  name: string, //Ionicon name
  action?:{ //Action to execute when icon clicked
    event?: {
      subject: BehaviorSubject<any>,
      value: any //Value to emit
    },
    modal?: {
      component: any, //Component to open in modal when clicked
      params: any //Parameters to pass to that component
    }
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

  takeAction(action) {
    if (action.modal){
      let modal = this.modalCtrl.create(action.modal.component, action.modal.params);
      modal.present();
    } else if (action.event){
      action.event.subject.next(action.event.value);
    }
  }
}
