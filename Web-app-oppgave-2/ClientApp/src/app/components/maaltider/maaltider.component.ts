import { Component, OnInit } from '@angular/core';
import {Maaltid} from "../../../models/maaltid";

@Component({
  selector: 'app-maaltider',
  templateUrl: './maaltider.component.html',
  styleUrls: ['./maaltider.component.css']
})
export class MaaltiderComponent implements OnInit {
  maaltider:Maaltid[];
  formType:string = "maaltid"
  constructor() {
    this.maaltider = [
      {
        id:1,
        navn: "Frokost",
        beskrivelse:"Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
          " sed do eiusmod tempor incididunt ut labore " +
          "et dolore magna aliqua. Ut enim ad minim veniam, " +
          "quis nostrud exercitation ullamco laboris nisi ut" +
          " aliquip ex ea commodo consequat. Duis aute irure dolor " +
          "in reprehenderit in voluptate velit esse cillum dolore eu fugiat" +
          " nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in " +
          "culpa qui officia deserunt mollit anim id est laborum.",
        bilde: "../../assets/kiel.jpg",
        pris: 199.90
      },{
        id:2,
        navn: "Frokost",
        beskrivelse:"Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
          " sed do eiusmod tempor incididunt ut labore " +
          "et dolore magna aliqua. Ut enim ad minim veniam, " +
          "quis nostrud exercitation ullamco laboris nisi ut" +
          " aliquip ex ea commodo consequat. Duis aute irure dolor " +
          "in reprehenderit in voluptate velit esse cillum dolore eu fugiat" +
          " nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in " +
          "culpa qui officia deserunt mollit anim id est laborum.",
        bilde: "../../assets/kiel.jpg",
        pris: 199.90
      },{
        id:3,
        navn: "Frokost",
        beskrivelse:"Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
          " sed do eiusmod tempor incididunt ut labore " +
          "et dolore magna aliqua. Ut enim ad minim veniam, " +
          "quis nostrud exercitation ullamco laboris nisi ut" +
          " aliquip ex ea commodo consequat. Duis aute irure dolor " +
          "in reprehenderit in voluptate velit esse cillum dolore eu fugiat" +
          " nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in " +
          "culpa qui officia deserunt mollit anim id est laborum.",
        bilde: "../../assets/kiel.jpg",
        pris: 199.90
      }
    ];
  }

  ngOnInit(): void {
  }

}
