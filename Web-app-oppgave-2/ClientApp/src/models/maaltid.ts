export class Maaltid{
  id?:number;
  navn:string;
  beskrivelse:string;
  bilde?:any;
  pris:number;

  constructor(navn:string, beskrivelse:string,pris:number){
    this.navn = navn;
    this.beskrivelse = beskrivelse;
    //this.bilde = bilde;
    this.pris = pris;
  }

}
