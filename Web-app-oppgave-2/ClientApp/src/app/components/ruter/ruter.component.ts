import { Component, OnInit, Output } from '@angular/core';
import { Rute } from 'src/models/rute';
import { RuterService } from "../../Services/ruter.service";

@Component({
  selector: 'app-ruter',
  templateUrl: './ruter.component.html',
  styleUrls: ['./ruter.component.css']
})
export class RuterComponent implements OnInit {
  ruter: Rute[] = [];
  formType:string = "rute"

  constructor(private service: RuterService) { }

  ngOnInit(): void {
    this.service.hentAlle().subscribe(
      data => {this.ruter = data},
      error => console.error(error)
    );
  }
}
