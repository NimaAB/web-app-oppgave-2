import { NgModule } from '@angular/core';
//import {  } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { RuteCardComponent } from './components/rute-card/rute-card.component';
import { MaaltidCardComponent } from './components/maaltid-card/maaltid-card.component';
import { LugarCardComponent } from './components/lugar-card/lugar-card.component';

@NgModule({
  declarations: [
    AppComponent,
    RuteCardComponent,
    MaaltidCardComponent,
    LugarCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
