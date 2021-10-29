import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Rute } from 'src/models/rute';

@Component({
  selector: 'app-rute-card',
  templateUrl: './rute-card.component.html',
  styleUrls: ['./rute-card.component.css']
})
export class RuteCardComponent implements OnInit {
  @Output() isFormShown = new EventEmitter<boolean>();
  rute:Rute;
  constructor() {

    this.rute = {
      id:1,
      tur: "Oslo-Kiel",
      bilde: "../../assets/kiel.jpg",
      pris: 999.99
    };
  }

  ngOnInit(): void {
  }

  sendDisplayEvent(){
    this.isFormShown.emit(true);
  }

}
