import { Injectable } from '@angular/core';
import { DataService } from "./data.service";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class RuterService extends DataService{
  constructor(http: HttpClient) {
    super("/api/rute", http)
  }
}
