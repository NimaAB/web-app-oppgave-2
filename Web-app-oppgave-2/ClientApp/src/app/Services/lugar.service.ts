import { Injectable } from '@angular/core';
import { DataService } from "./data.service";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class LugarService extends DataService{
  constructor(http: HttpClient) {
    super("/api/lugar", http)
  }
}
