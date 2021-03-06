import { Component, OnInit } from '@angular/core';
import {Maaltid} from "../../../models/maaltid";
import {FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router } from '@angular/router';
import { MaaltidService } from 'src/app/Services/maaltid.service';

@Component({
  selector: 'app-maaltid-form',
  templateUrl: './maaltid-form.component.html',
  styleUrls: ['./maaltid-form.component.css']
})
export class MaaltidFormComponent implements OnInit{
  isSubmitted: boolean = false;
  formAction: string | null = "";
  currentId !: number;

  form = new FormGroup({
    id: new FormControl(),
    navn: new FormControl(
      null,
      Validators.compose([Validators.required,Validators.pattern("[A-ZÆØÅ][A-ZÆØÅa-zæøå -]{2,25}")])
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

  constructor(private service: MaaltidService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe((param) => {
          this.formAction = param.get('action');
          this.currentId = Number(param.get('id'));
        },
        error => console.log(error)
      );

    if(this.formAction == 'slett') {
      this.slettMaaltid();
    }
    if(this.formAction == 'oppdater'){
      this.hentEn();
    }
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
    this.isSubmitted = true;
    this.form.reset();
  }

  redirectTo(url: string) {
    this.router.navigateByUrl(url);
  }

  hentEn(){
    this.service.hentEn(this.currentId)
      .subscribe(maaltid => {
          this.form.patchValue({id: maaltid.maaltidId});
          this.form.patchValue({navn: maaltid.navn});
          this.form.patchValue({beskrivelse: maaltid.beskrivelse});
          this.form.patchValue({pris: maaltid.pris});
        },
        (error) =>
        {
          if(error.status == 401) window.location.href = "/loggInn.html";
          this.service.setError(error.error);
        }
      )
  }

  endreMaaltid() {
    const nyMaaltid = {
      id: this.form.value.id,
      navn: this.form.value.navn,
      beskrivelse: this.form.value.beskrivelse,
      pris: this.form.value.pris
    }
    this.service.oppdater(nyMaaltid)
      .subscribe((data:any) => {
          this.service.setMessage(data.message);
          this.redirectTo("/maaltider");
        },
        (error) => {
          if(error.status == 401) window.location.href = "/loggInn.html";
          this.service.setError(error.error);
        });
  }

  lagreNyMaaltid() {
    const nyMaaltid = {
      navn: this.form.value.navn,
      beskrivelse: this.form.value.beskrivelse,
      pris: this.form.value.pris,
    }
    this.service.lagre(nyMaaltid)
      .subscribe((data:any) => {
          this.service.setMessage(data.message);
          this.redirectTo("/maaltider");
        },
        (error) => {
          if(error.status == 401) window.location.href = "/loggInn.html";
          this.service.setError(error.error);
        });
  }

  slettMaaltid(){
    this.service.slett(this.currentId)
      .subscribe((data:any) => {
          this.service.setMessage(data.message);
          this.redirectTo("/maaltider");
        },
      (error) => {
        if(error.status == 401) window.location.href = "/loggInn.html";
        this.service.setError(error.error);
      });
  }
}
