import { Component, OnInit } from '@angular/core';
import { Rute } from 'src/models/rute';

@Component({
  selector: 'app-rute-form',
  templateUrl: './rute-form.component.html',
  styleUrls: ['./rute-form.component.css']
})
export class RuteFormComponent implements OnInit {
  rute:Rute;
  constructor() {
    this.rute = {
      tur: "Oslo-Kiel",
      bilde: "../../assets/kiel.jpg",
      pris: 999.99
    };
  }

  ngOnInit(): void {
  }


}
