import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Rute } from 'src/models/rute';

@Component({
  selector: 'app-ruter',
  templateUrl: './ruter.component.html',
  styleUrls: ['./ruter.component.css']
})
export class RuterComponent implements OnInit {
  ruter: Array<Rute> = new Array<Rute>();
  formType:string = "rute"

  constructor(private http:HttpClient) {
    /*this.ruter = [
      /*{
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
    ];*/
  }

  ngOnInit(): void {
    this.hentAlle();
  }

  hentAlle(){
    this.http.get<Rute[]>("api/rute/hentAlle")
      .subscribe(ruter => {
        this.ruter = ruter;
      },
      error => console.error(error),
        () => console.log("Get er gjort!")
      );
  }
}
