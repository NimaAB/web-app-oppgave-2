import { Component } from '@angular/core';
import {FormGroup, Validators, FormControl, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-rute-form',
  templateUrl: './rute-form.component.html',
  styleUrls: ['./rute-form.component.css']
})
export class RuteFormComponent{
  endringsForm: boolean = false;

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

  constructor() { }
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
    if(this.endringsForm){
      this.endreRute();
    } else {
      this.lagreNyRute();
    }
    this.isSubmitted = true;
    this.form.reset();
  }


  endreRute(){

  }

  lagreNyRute(){

  }
}
