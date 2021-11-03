import { HttpClient } from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import { map, catchError } from "rxjs/operators";
import {BehaviorSubject, throwError} from 'rxjs';

export class DataService{

  constructor(
    @Inject(String) private url: string,
    private http: HttpClient) {
  }

  hentAlle(){
    return this.http.get(this.url + '/hentAlle')
      .pipe(
        map((data : any) => {return data }),
        catchError((err, caught) => { return throwError(err) })
      );
  }

  hentEn(id: number){
    return this.http.get(this.url + '/' + id)
      .pipe(
        map((data: any) => { return data }),
        catchError((err, caught) => { return throwError(err) })
      );
  }

  lagre(resource: any){
    return this.http.post(this.url + "/lagre", resource)
      .pipe(
        map((data: any) => { return data }),
        catchError((err, caught) => { return throwError(err) })
      );
  }

  oppdater(resource: any){
    return this.http.put(this.url + '/oppdater/' + resource.id, resource)
      .pipe(
        catchError((err, caught) => { return throwError(err) })
      );
  }

  slett(id: string | null) {
    return this.http.delete(this.url + '/slett/' + id)
      .pipe(
        catchError((err, caught) => { return throwError(err) })
      );
  }

  private messageSource = new BehaviorSubject<string | undefined>(undefined);
  currentMessage = this.messageSource.asObservable();
  setMessage(message: string) {
    this.messageSource.next(message);
  }

  private errorSource = new BehaviorSubject<string | undefined>(undefined);
  currentError = this.errorSource.asObservable();
  setError(error: string) {
    this.errorSource.next(error);
  }
}
