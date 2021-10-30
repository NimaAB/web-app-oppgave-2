import { Component, Input } from '@angular/core';
import { Rute } from 'src/models/rute';

@Component({
  selector: 'app-rute-card',
  templateUrl: './rute-card.component.html',
  styleUrls: ['./rute-card.component.css']
})
export class RuteCardComponent{
  @Input() rute!: Rute;
  constructor() {
  }
}
