import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Lugar } from 'src/models/lugar';

@Component({
  selector: 'app-lugar-form',
  templateUrl: './lugar-form.component.html',
  styleUrls: ['./lugar-form.component.css']
})
export class LugarFormComponent implements OnInit {
  lugar:Lugar;
  constructor(private location:Location) {
    this.lugar = {
      id: 1,
      type: "Rom",
      navn: "Fin lugar",
      bilde: "../../assets/kiel.jpg",
      beskrivelse: "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
        " sed do eiusmod tempor incididunt ut labore " +
        "et dolore magna aliqua. Ut enim ad minim veniam, " +
        "quis nostrud exercitation ullamco laboris nisi ut" +
        " aliquip ex ea commodo consequat. Duis aute irure dolor " +
        "in reprehenderit in voluptate velit esse cillum dolore eu fugiat" +
        " nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in " +
        "culpa qui officia deserunt mollit anim id est laborum.",
      kapasistet: 3,
      maxReservasjon: 100,
      pris: 599.90
    };
  }
  ngOnInit(): void {}

  gaaTilbake() {
    this.location.back();
  }
}

