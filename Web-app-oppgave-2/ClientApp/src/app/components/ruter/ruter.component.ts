import { Component, OnInit, Output } from '@angular/core';
import { Rute } from 'src/models/rute';

@Component({
  selector: 'app-ruter',
  templateUrl: './ruter.component.html',
  styleUrls: ['./ruter.component.css']
})
export class RuterComponent implements OnInit {
  ruter: Rute [];
  formType:string = "rute"

  constructor() {
    this.ruter = [
      {
        id:1,
        tur: "Oslo-Kiel",
        bilde: "../../assets/kiel.jpg",
        pris: 999.99
      },
      {
        id:2,
        tur: "Oslo-Kiel",
        bilde: "../../assets/kiel.jpg",
        pris:1199.99
      },
      {
        id:3,
        tur: "Oslo-Kiel",
        bilde: "../../assets/kiel.jpg",
        pris: 2199.99
      }
    ];
  }

  ngOnInit(): void {
  }

}
