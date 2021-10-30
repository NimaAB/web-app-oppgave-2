import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { RuteCardComponent } from './components/rute-card/rute-card.component';
import { MaaltidCardComponent } from './components/maaltid-card/maaltid-card.component';
import { LugarCardComponent } from './components/lugar-card/lugar-card.component';
import { RuteFormComponent } from './components/rute-form/rute-form.component';

import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { E404Component } from './components/e404/e404.component';
import { MaaltidFormComponent } from './components/maaltid-form/maaltid-form.component';
import { LugarFormComponent } from './components/lugar-form/lugar-form.component';
import { RuterComponent } from './components/ruter/ruter.component';
import { MaaltiderComponent } from './components/maaltider/maaltider.component';
import { LugarerComponent } from './components/lugarer/lugarer.component';
import { AddItemCardComponent } from './components/add-item-card/add-item-card.component';

@NgModule({
  declarations: [
    AppComponent,
    RuteCardComponent,
    MaaltidCardComponent,
    LugarCardComponent,
    RuteFormComponent,
    NavbarComponent,
    E404Component,
    MaaltidFormComponent,
    LugarFormComponent,
    RuterComponent,
    MaaltiderComponent,
    LugarerComponent,
    AddItemCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
