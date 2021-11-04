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

  message: string | undefined = undefined;
  error: string | undefined = undefined;
  showMessage: boolean = false;
  showError: boolean = false;

  constructor(private service: RuterService) {
    this.showMessageAlert();
    this.showErrorAlert();
  }

  ngOnInit(): void {
    this.service.hentAlle().subscribe(
      data => {this.ruter = data},
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
