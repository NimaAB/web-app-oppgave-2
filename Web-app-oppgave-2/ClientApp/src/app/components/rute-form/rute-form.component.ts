import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import {RuterService} from "../../Services/ruter.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-rute-form',
  templateUrl: './rute-form.component.html',
  styleUrls: ['./rute-form.component.css']
})
export class RuteFormComponent implements OnInit{
  isSubmitted: boolean = false;
  formAction: string | null = "";
  currentId: string | null = "";

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
        this.currentId = param.get('id');
        },
      )

    if(this.formAction == 'slett') {
      this.slettRute();
      this.redirectTo('/ruter');
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

  endreRute(){
    const nyRute = {
      id: this.currentId,
      tur: this.form.value.fra + "-" + this.form.value.til,
      pris: this.form.value.pris
    };

    this.service.oppdater(nyRute).subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }

  lagreNyRute(){
    const nyRute = {
      tur: this.form.value.fra + "-" + this.form.value.til,
      pris: this.form.value.pris
    };

    this.service.lagre(nyRute).subscribe(
      data => console.log(data),
      error => console.error(error)
    );
  }

  slettRute(){
    this.service.slett(this.currentId).subscribe(
      data => console.log(data),
      error => console.error(error)
    )
  }
}
