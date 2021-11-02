import { Component, Input } from '@angular/core';
import {Maaltid} from "../../../models/maaltid";

@Component({
  selector: 'app-maaltid-card',
  templateUrl: './maaltid-card.component.html',
  styleUrls: ['./maaltid-card.component.css']
})
export class MaaltidCardComponent {
  @Input() maaltid!:Maaltid;
  constructor() {}
}
