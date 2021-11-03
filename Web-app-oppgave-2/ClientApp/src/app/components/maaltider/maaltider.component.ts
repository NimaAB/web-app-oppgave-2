import { Component, OnInit } from '@angular/core';
import {Maaltid} from "../../../models/maaltid";
import {MaaltidService} from "../../Services/maaltid.service";

@Component({
  selector: 'app-maaltider',
  templateUrl: 'maaltider.component.html',
  styleUrls: ['maaltider.component.css']
})
export class MaaltiderComponent implements OnInit {
  maaltider:Maaltid[] = [];
  formType:string = "maaltid"

  message: string | undefined = undefined;
  error: string | undefined = undefined;
  showMessage: boolean = false;
  showError: boolean = false;

  constructor(private service: MaaltidService) {
    this.showMessageAlert();
    this.showErrorAlert();
  }

  ngOnInit(): void {
    this.service.hentAlle().subscribe(
      data => {this.maaltider = data},
      error => console.error(error)
    );
  }

  showMessageAlert(){
    this.service.currentMessage
      .subscribe(message => {
          this.message = message;
          if(message != undefined) this.showMessage = true;
          this.hideAlert();
        },
        error=>console.log(error)
      );
  }

  showErrorAlert(){
    this.service.currentError
      .subscribe(error => {
          this.error = error;
          if(error != undefined) this.showError = true;
          this.hideAlert();
        },
        error => console.log(error)
      );
  }

  hideAlert(){
    setTimeout(() => {
      this.showMessage = false;
      this.showError = false;
      this.message = undefined;
      this.error = undefined;
    }, 3000)
  }

}
