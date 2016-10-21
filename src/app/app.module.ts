import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';

import { UCFirst } from "../pipes/uc-first";

import { MyApp } from './app.component';
import { NewHymnalList } from '../pages/new-hymnal/new-hymnal-list';
import { NewHymnalDetail } from '../pages/new-hymnal/new-hymnal-detail/new-hymnal-detail';
import { OldHymnalList } from '../pages/old-hymnal/old-hymnal-list';
import { OldHymnalDetail } from '../pages/old-hymnal/old-hymnal-detail/old-hymnal-detail';
import { NumberFind }  from "../pages/number-find/number-find";
import { Favorites } from '../pages/favorites/favorites';
import { FeedbackPage } from '../pages/feedback/feedback';
import { DonationPage } from '../pages/donation/donation';
import { ContactUs } from '../pages/contact-us/contact-us';
import { TabsPage } from '../pages/tabs/tabs';
import { TabHeaderComponent } from '../pages/tabs/tab-header/tab-header';

@NgModule({
  declarations: [
    MyApp,
    NewHymnalList,
    NewHymnalDetail,
    OldHymnalList,
    OldHymnalDetail,
    NumberFind,
    Favorites,
    FeedbackPage,
    DonationPage,
    ContactUs,
    TabsPage,
    TabHeaderComponent,
    UCFirst
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewHymnalList,
    NewHymnalDetail,
    OldHymnalList,
    OldHymnalDetail,
    NumberFind,
    Favorites,
    FeedbackPage,
    DonationPage,
    ContactUs,
    TabsPage,
    TabHeaderComponent
  ],
  providers: []
})
export class AppModule {}
