import {Component} from "@angular/core";


@Component({
  selector:'app-tab-bar',
  templateUrl:'tab_bar.component.html'
})
export class Tab_barComponent{
  tabs:string[];
  constructor() {
    this.tabs = ["Ruter","Lugarer", "Måltider"];
  }
}
