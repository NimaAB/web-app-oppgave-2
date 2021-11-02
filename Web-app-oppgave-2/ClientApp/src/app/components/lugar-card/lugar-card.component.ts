import { Component, Input } from '@angular/core';
import { Lugar } from 'src/models/lugar';

@Component({
  selector: 'app-lugar-card',
  templateUrl: './lugar-card.component.html',
  styleUrls: ['./lugar-card.component.css']
})
export class LugarCardComponent {
  @Input() lugar!:Lugar;
  constructor() {
  }
}
