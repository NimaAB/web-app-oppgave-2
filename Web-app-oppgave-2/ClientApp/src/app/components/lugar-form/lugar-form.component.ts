import { Component, OnInit } from '@angular/core';
import { Lugar } from 'src/models/lugar';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {LugarService} from "../../Services/lugar.service";

@Component({
  selector: 'app-lugar-form',
  templateUrl: './lugar-form.component.html',
  styleUrls: ['./lugar-form.component.css']
})
export class LugarFormComponent implements OnInit{
  isSubmitted: boolean = false;
  formAction: string | null = "";
  currentId !: number;

  form:FormGroup = new FormGroup({
    id: new FormControl(),
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

  constructor(private service: LugarService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe((param) => {
          this.formAction = param.get('action');
          this.currentId = Number(param.get('id'));
        },
        error => console.log(error)
      );

    if(this.formAction == 'slett') {
      this.slettLugar();
    }

    if(this.formAction=='oppdater'){
      this.hentEn();
    }
  }

  get type(){
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

  onSubmit(){
    this.isSubmitted = true;
    this.form.reset();
  }

  redirectTo(url: string) {
    this.router.navigateByUrl(url);
  }

  hentEn(){
    this.service.hentEn(this.currentId)
      .subscribe(lugar=>{
          this.form.patchValue({id: lugar.lugarId});
          this.form.patchValue({type: lugar.type});
          this.form.patchValue({navn: lugar.navn});
          this.form.patchValue({beskrivelse: lugar.beskrivelse});
          this.form.patchValue({kapasitet: lugar.kapasitet});
          this.form.patchValue({maxReservasjon: lugar.maxReservasjon});
          this.form.patchValue({pris: lugar.pris});
        },
        error => console.log(error)
      );
  }

  endreLugar() {
    const nyLugar = {
      id: this.form.value.id,
      type: this.form.value.type,
      navn: this.form.value.navn,
      beskrivelse: this.form.value.beskrivelse,
      maxReservasjon: this.form.value.maxReservasjon,
      kapasitet: this.form.value.kapasitet,
      pris: this.form.value.pris
    }
    this.service.oppdater(nyLugar)
      .subscribe((data:any) => {
          this.service.setMessage(data.message);
          this.redirectTo('/lugarer');
        },
      (error) => this.service.setError(error.error)
    );

  }

  lagreNyLugar() {
    const nyLugar = {
      type: this.form.value.type,
      navn: this.form.value.navn,
      beskrivelse: this.form.value.beskrivelse,
      maxReservasjon: this.form.value.maxReservasjon,
      kapasitet: this.form.value.kapasitet,
      pris: this.form.value.pris
    };
    console.log(nyLugar);
    this.service.lagre(nyLugar)
      .subscribe((data:any) => {
          this.service.setMessage(data.message);
          this.redirectTo('/lugarer');
        },
      (error) => this.service.setError(error.error)
    );
  }

  slettLugar() {
    this.service.slett(this.currentId)
      .subscribe((data:any) => {
        this.service.setMessage(data.message);
        this.redirectTo('/lugarer');
        },
      error => console.error(error)
    );

  }

}

