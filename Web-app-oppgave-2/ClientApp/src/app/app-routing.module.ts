import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RuteFormComponent} from "./components/rute-form/rute-form.component";
import {RuteCardComponent} from "./components/rute-card/rute-card.component";
import {MaaltidCardComponent} from "./components/maaltid-card/maaltid-card.component";
import {LugarCardComponent} from "./components/lugar-card/lugar-card.component";
import {E404Component} from "./components/e404/e404.component";

const routes: Routes = [
  {path: 'ruter', component: RuteCardComponent},
  {path: 'maaltider', component: MaaltidCardComponent},
  {path: 'lugarer', component: LugarCardComponent},
  {path: 'api/rute/oppdater/:id', component: RuteFormComponent},
  //{path:'api/maaltid/oppdater/:id', component: MaaltidFormComponent},
  //{path:'api/lugar/oppdater/:id', component: LugarFormComponent}
  {path: '**', component: E404Component}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
