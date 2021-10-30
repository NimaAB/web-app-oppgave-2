import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RuteFormComponent} from "./components/rute-form/rute-form.component";
import {E404Component} from "./components/e404/e404.component";
import { MaaltidFormComponent } from './components/maaltid-form/maaltid-form.component';
import { LugarFormComponent } from './components/lugar-form/lugar-form.component';
import {RuterComponent} from "./components/ruter/ruter.component";
import {MaaltiderComponent} from "./components/maaltider/maaltider.component";
import { LugarerComponent } from './components/lugarer/lugarer.component';

const routes: Routes = [
  {path: '', component: RuterComponent},
  {path: 'ruter', component: RuterComponent},
  {path: 'maaltider', component: MaaltiderComponent},
  {path: 'lugarer', component: LugarerComponent},
  {path: 'api/rute/oppdater/:id', component: RuteFormComponent},
  {path: 'api/rute/opprett', component: RuteFormComponent},
  {path:'api/maaltid/oppdater/:id', component: MaaltidFormComponent},
  {path:'api/maaltid/opprett', component: MaaltidFormComponent},
  {path:'api/lugar/oppdater/:id', component: LugarFormComponent},
  {path:'api/lugar/opprett', component: LugarFormComponent},
  {path: '**', component: E404Component}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
