import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isExpanded: boolean = true;
  constructor(private _http:HttpClient) {
  }

  toggle(){
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    const url = "/Login/loggut";
    this._http.get(url).subscribe((res)=>{
        window.location.href = "kunde.html";
      },
      error=>console.log(error)
    );
  }
}
