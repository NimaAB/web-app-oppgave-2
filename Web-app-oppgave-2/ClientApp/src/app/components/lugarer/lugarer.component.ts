import { Component, OnInit } from '@angular/core';
import { LugarService } from 'src/app/Services/lugar.service';
import {Lugar} from "../../../models/lugar";

@Component({
  selector: 'app-lugarer',
  templateUrl: './lugarer.component.html',
  styleUrls: ['./lugarer.component.css']
})
export class LugarerComponent implements OnInit {
  lugarer:Lugar[] = [];
  formType:string = "lugar"
  message: string | undefined = undefined;
  error: string | undefined = undefined;
  showMessage: boolean = false;
  showError: boolean = false;

  constructor(private service: LugarService) {
    this.showMessageAlert();
    this.showErrorAlert();
  }

  ngOnInit(): void {
    this.service.hentAlle().subscribe(
      data => {this.lugarer = data},
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
