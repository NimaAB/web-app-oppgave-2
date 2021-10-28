import { Component, OnInit } from '@angular/core';
import { Rute } from 'src/models/rute';

@Component({
  selector: 'app-rute-card',
  templateUrl: './rute-card.component.html',
  styleUrls: ['./rute-card.component.css']
})
export class RuteCardComponent implements OnInit {
  rute:Rute;
  constructor() {

    this.rute = {
      tur: "Oslo-Kiel",
      bilde: "../../assets/kiel.jpg",
      pris: 999.00
    };
  }

  ngOnInit(): void {
  }

}
