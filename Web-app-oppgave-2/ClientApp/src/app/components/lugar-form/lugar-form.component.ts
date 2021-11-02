import { Component, OnInit } from '@angular/core';
import { Lugar } from 'src/models/lugar';
import {FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lugar-form',
  templateUrl: './lugar-form.component.html',
  styleUrls: ['./lugar-form.component.css']
})
export class LugarFormComponent {
  erEndringsForm: boolean = true;
  currentLugarId:any = undefined;
  isSubmitted: boolean = false;

  form:FormGroup = new FormGroup({
    id: new FormControl(),
    typ: new FormControl(
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

  constructor() {
    this.setErEndringsForm()
    this.setId();
  }


  get typ(){
    return this.form.controls.type;
  }
  get navn(){
    return this.form.controls.navn;
  }
  get beskrivelse(){
    return this.form.controls.beskrivelse;
  }
  get kapasitet(){
    return this.form.controls.kapasitet;
  }
  get maxReservasjon(){
    return this.form.controls.maxReservasjon;
  }
  get pris(){
    return this.form.controls.pris;
  }

  setErEndringsForm(){
    const url = window.location.href
    console.log(url.split("/"));
    this.erEndringsForm = url.split("/")[5] === 'oppdater';
  }
  setId(){
    const url = window.location.href
    if(this.erEndringsForm){
      this.currentLugarId = url.split("/")[6];
    }
  }

  onSubmit(){
    if(this.erEndringsForm){
      this.endreLugar();
    } else {
      this.lagreNyLugar();
    }
    this.isSubmitted = true;
    this.form.reset();
  }

  private endreLugar() {

  }

  private lagreNyLugar() {

  }
}

