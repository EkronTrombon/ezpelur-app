import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Partitura } from '../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class PartituraService {

  constructor(private http: HttpClient) {}

  getPartituras() {
    return this.http.get<Partitura[]>(`${URL}/partitura`);
  }
}
