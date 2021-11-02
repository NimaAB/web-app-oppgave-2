import { Component } from '@angular/core';
import {Maaltid} from "../../../models/maaltid";
import {FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-maaltid-form',
  templateUrl: './maaltid-form.component.html',
  styleUrls: ['./maaltid-form.component.css']
})
export class MaaltidFormComponent{
  erEndringsForm: boolean = true;
  currentMaaltidId:any = undefined;
  isSubmitted: boolean = false;

  form = new FormGroup({
    id: new FormControl(),
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

  constructor() {
    this.setErEndringsForm()
    this.setId();
  }

  get navn(){
    return this.form.controls.navn;
  }

  get beskrivelse(){
    return this.form.controls.beskrivelse;
  }

  get pris(){
    return this.form.controls.pris;
  }

  onSubmit(){
    if(this.erEndringsForm){
      this.endreMaaltid();
    } else {
      this.lagreNyMaaltid();
    }
    this.isSubmitted = true;
    this.form.reset();
  }

  setErEndringsForm(){
    const url = window.location.href
    console.log(url.split("/"));
    this.erEndringsForm = url.split("/")[5] === 'oppdater';
  }

  setId(){
    const url = window.location.href
    if(this.erEndringsForm){
      this.currentMaaltidId = url.split("/")[6];
    }
  }

  private endreMaaltid() {

  }

  private lagreNyMaaltid() {

  }
}
