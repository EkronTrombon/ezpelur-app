import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Actuacion } from '../interfaces/interfaces';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class ActuacionService {

  constructor( private http: HttpClient) {}

  getActuaciones() {
    return this.http.get<Actuacion[]>(`${URL}/actuacion`);
  }
}
