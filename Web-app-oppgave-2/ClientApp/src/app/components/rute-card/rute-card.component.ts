import { Component, OnInit } from '@angular/core';
import { Rute } from 'src/models/rute';

@Component({
  selector: 'app-rute-card',
  templateUrl: './rute-card.component.html',
  styleUrls: ['./rute-card.component.css']
})
export class RuteCardComponent implements OnInit {
  ruter: Rute[];
  constructor() {

    this.ruter = [

    ];
  }

  ngOnInit(): void {
  }

}
