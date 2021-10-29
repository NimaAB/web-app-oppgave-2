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

@NgModule({
  declarations: [
    AppComponent,
    RuteCardComponent,
    MaaltidCardComponent,
    LugarCardComponent,
    RuteFormComponent,
    NavbarComponent,
    E404Component
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
