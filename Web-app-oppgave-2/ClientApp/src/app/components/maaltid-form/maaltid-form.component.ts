import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {Maaltid} from "../../../models/maaltid";
import {FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-maaltid-form',
  templateUrl: './maaltid-form.component.html',
  styleUrls: ['./maaltid-form.component.css']
})
export class MaaltidFormComponent implements OnInit {
  form = new FormGroup({
    navn: new FormControl(
      null,
      Validators.compose([Validators.required,Validators.pattern("[A-ZÆØÅ][a-zæøå]{2,25}")])
    ),
    beskrivelse: new FormControl(
      null,
      Validators.required
    ),
    pris: new FormControl(
      null,
      Validators.required
    ),
    //bilde: new FormControl()
  });

  constructor(private location:Location) {

  }


  ngOnInit(): void {
  }

  onSubmit(){
    if(this.form.valid){
      console.log(this.form.value)
    }
  }

  gaaTilbake() {
    this.location.back();
  }

}
