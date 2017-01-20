import { Component } from '@angular/core';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: "app.template.html"
})
export class HymnalApp {
  rootPage = TabsPage;

  constructor() {
  }
}
