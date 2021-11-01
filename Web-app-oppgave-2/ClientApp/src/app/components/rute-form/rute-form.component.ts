import { Component, OnInit } from '@angular/core';
import { Rute } from 'src/models/rute';
import { Location } from '@angular/common';
import {FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-rute-form',
  templateUrl: './rute-form.component.html',
  styleUrls: ['./rute-form.component.css']
})
export class RuteFormComponent implements OnInit {
  endringsForm: boolean = true;
  form = new FormGroup({
    id: new FormControl(),
    fra: new FormControl(
      null,
      Validators.compose([Validators.required,Validators.pattern("[A-ZÆØÅ][a-zæøå]{2,25}")])
    ),
    til: new FormControl(
      null,
      Validators.compose([Validators.required,Validators.pattern("[A-ZÆØÅ][a-zæøå]{2,25}")])
    ),
    pris: new FormControl(
      null,
      Validators.required
    )
  });

  constructor(private location:Location) { }

  ngOnInit(): void {
  }

  gaaTilbake() {
    this.location.back();
  }

  onSubmit() {
    if(this.endringsForm){
      this.endreRute();
    } else {
      this.lagreNyRute();
    }
  }

  endreRute(){

  }

  lagreNyRute(){

  }
}
