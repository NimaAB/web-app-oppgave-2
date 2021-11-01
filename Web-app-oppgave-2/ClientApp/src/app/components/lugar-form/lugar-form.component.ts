import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Lugar } from 'src/models/lugar';
import {FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lugar-form',
  templateUrl: './lugar-form.component.html',
  styleUrls: ['./lugar-form.component.css']
})
export class LugarFormComponent implements OnInit {
  form:FormGroup = new FormGroup({
    type: new FormControl(
      null,
      Validators.compose([Validators.required,Validators.pattern("[A-ZÆØÅ][a-zæøå ]{2,25}")])
    ),
    navn: new FormControl(
      null,
      Validators.compose([Validators.required,Validators.pattern("[A-ZÆØÅ][a-zæøå]{2,25} [A-ZÆØÅ][a-zæøå]{2,25}")])
    ),
    beskrivelse: new FormControl(
      null,
      Validators.required
    ),
    kapasitet: new FormControl(null, Validators.required),
    maxReservasjon: new FormControl(null,Validators.required),
    pris: new FormControl(null,Validators.required),
    //bilde: new FormControl()
  });
  constructor(private location:Location) {

  }
  ngOnInit(): void {}

  onSubmit(){
    if(this.form.valid){
      console.log(this.form.value)
    }
  }

  gaaTilbake() {
    this.location.back();
  }
}

