import {Component, Input} from "@angular/core";

@Component({
  selector:'app-tab-item',
  templateUrl:'tab_item.component.html',
})
export class Tab_itemComponent{
  @Input() tab:string;

  constructor() {
  }

}
