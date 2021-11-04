export class Lugar{
  lugarId?:number;
  type:string;
  navn:string;
  kapasitet:number;
  maxReservasjon:number;
  beskrivelse:string;
  bilde?:any;
  pris:number;

  constructor(type:string, navn:string,
    kapasitet:number, maxReservasjon:number,
    beskrivelse:string, pris:number) {
    this.type = type;
    this.navn = navn;
    this.beskrivelse = beskrivelse;
    this.kapasitet = kapasitet;
    this.maxReservasjon = maxReservasjon;
    this.pris = pris;
    //this.bilde = bilde;
  }
}
