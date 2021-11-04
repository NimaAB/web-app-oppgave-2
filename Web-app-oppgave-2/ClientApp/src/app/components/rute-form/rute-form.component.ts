import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {RuterService} from "../../Services/ruter.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../Services/data.service";

@Component({
  selector: 'app-rute-form',
  templateUrl: './rute-form.component.html',
  styleUrls: ['./rute-form.component.css']
})
export class RuteFormComponent implements OnInit{
  isSubmitted: boolean = false;
  formAction: string | null = "";
  currentId !: number;

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

  constructor(
    private service: RuterService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe((param) => {
        this.formAction = param.get('action');
        this.currentId = Number(param.get('id'));
        },
        error => console.log(error)
      )

    if(this.formAction == 'slett') {
      this.slettRute();
    }

    if(this.formAction=='oppdater'){
      this.hentEn();
    }
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
    this.isSubmitted = true;
    this.form.reset();
  }

  redirectTo(url: string) {
    this.router.navigateByUrl(url);
  }

  hentEn(){
    this.service.hentEn(this.currentId)
      .subscribe(rute => {
          const tur = rute.tur.split("-");
          this.form.patchValue({id: rute.ruteId});
          this.form.patchValue({fra: tur[0] });
          this.form.patchValue({til: tur[1] });
          this.form.patchValue({pris: rute.pris});
        },
        error => console.log(error)
      )
  }

  endreRute(){
    const nyRute = {
      id: this.form.value.id,
      tur: this.form.value.fra + "-" + this.form.value.til,
      pris: this.form.value.pris
    };

    this.service.oppdater(nyRute)
      .subscribe((data:any) => {
          this.service.setMessage(data.message);
          this.redirectTo('/ruter');
        },
      (error) => {
        if(error.status == 401) window.location.href = "/loggInn.html";
        this.service.setError(error.error);
      }
    );
  }

  lagreNyRute(){
    const nyRute = {
      tur: this.form.value.fra + "-" + this.form.value.til,
      pris: this.form.value.pris
    };

    this.service.lagre(nyRute)
      .subscribe((data:any) => {
          this.service.setMessage(data.message);
          this.redirectTo('/ruter');
        },
      (error) => {
        if(error.status == 401) window.location.href = "/loggInn.html";
        this.service.setError(error.error);
      }
    );
  }

  slettRute(){
    this.service.slett(this.currentId)
      .subscribe((data:any) => {
          this.service.setMessage(data.message);
          this.redirectTo('/ruter');
        },
        (error) => {
          if(error.status == 401) window.location.href = "/loggInn.html";
          this.service.setError(error.error);
      }
    );
  }
}
