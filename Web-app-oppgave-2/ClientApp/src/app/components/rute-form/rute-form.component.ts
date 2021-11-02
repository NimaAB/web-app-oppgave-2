import { Component, Input } from '@angular/core';
import {FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-rute-form',
  templateUrl: './rute-form.component.html',
  styleUrls: ['./rute-form.component.css']
})
export class RuteFormComponent{
  erEndringsForm: boolean = true;
  currentRuteId:any = undefined;
  isSubmitted: boolean = false;

  form = new FormGroup({
    id: new FormControl(),
    fra: new FormControl(
      null, [
        Validators.required,
        Validators.pattern("[A-ZÆØÅ][a-zæøå]{2,25}")]
    ),
    til: new FormControl(
      null, [
        Validators.required,
        Validators.pattern("[A-ZÆØÅ][a-zæøå]{2,25}")]
    ),
    pris: new FormControl(
      null, Validators.required
    ),
    bilde: new FormControl(
      null
    )
  });

  constructor() {
    this.setErEndringsForm()
    this.setId();
  }
  get fra(){
    return this.form.controls.fra;
  }

  get til(){
    return this.form.controls.til;
  }

  get pris(){
    return this.form.controls.pris;
  }

  get bilde(){
    return this.form.controls.bilde;
  }

  onSubmit() {
    if(this.erEndringsForm){
      this.endreRute();
    } else {
      this.lagreNyRute();
    }
    this.isSubmitted = true;
    this.form.reset();
  }

  setErEndringsForm(){
    const url = window.location.href
    this.erEndringsForm = url.split("/")[5] === 'oppdater';
  }
  setId(){
    const url = window.location.href
    if(this.erEndringsForm){
      this.currentRuteId = url.split("/")[6];
    }
  }
  endreRute(){

  }

  lagreNyRute(){

  }


}
