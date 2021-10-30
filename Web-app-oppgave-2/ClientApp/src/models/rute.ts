export class Rute{
  id?:number;
  tur:string;
  bilde?:any;
  pris:number;

  constructor(tur:string, pris:number) {
    this.tur = tur;
    //this.bilde = bilde;
    this.pris = pris;
  }

}
