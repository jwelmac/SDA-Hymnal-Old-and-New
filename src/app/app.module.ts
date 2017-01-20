import { NgModule } from '@angular/core';

import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage }  from "@ionic/storage";

import { UCFirst } from "../pipes/uc-first";

import { HymnalApp } from './app.component';
import { HymnDetail } from '../components';
import {
         HymnView, NewHymnal, OldHymnal,NumberSearch, Favorites,
         FeedbackPage, DonationPage, ContactUs, TabsPage, TabHeaderComponent
       } from '../pages';
import { HymnalReader, HymnalFaves }  from "../providers";

@NgModule({
  declarations: [
    HymnalApp,
    HymnDetail,
    HymnView,
    NewHymnal,
    OldHymnal,
    NumberSearch,
    Favorites,
    FeedbackPage,
    DonationPage,
    ContactUs,
    TabsPage,
    TabHeaderComponent,
    UCFirst
  ],
  imports: [
    IonicModule.forRoot(HymnalApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    HymnalApp,
    HymnDetail,
    HymnView,
    NewHymnal,
    OldHymnal,
    NumberSearch,
    Favorites,
    FeedbackPage,
    DonationPage,
    ContactUs,
    TabsPage,
    TabHeaderComponent
  ],
  providers: [HymnalFaves, Storage, HymnalReader]
})
export class AppModule {}
