import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Actuacion } from '../interfaces/interfaces';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class ActuacionService {

  nuevaActuacion = new EventEmitter<Actuacion>();

  constructor(private http: HttpClient) {}

  getActuaciones() {
    return this.http.get<Actuacion[]>(`${URL}/actuacion`);
  }

  createActuacion(actuacion: Actuacion) {
    return new Promise(resolve => {
      this.http.post(`${URL}/actuacion/create`, actuacion).subscribe((resp: any) => {
        if (resp.ok) {
          this.nuevaActuacion.emit(resp.actuacion);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  updateActuacion(idActuacion: string, actuacion: Actuacion) {
    return new Promise(resolve => {
      this.http.post(`${URL}/actuacion/update/${idActuacion}`, actuacion).subscribe((resp: any) => {
        if (resp.ok) {
          this.nuevaActuacion.emit(resp.actuacion);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  deleteActuacion(idActuacion: string) {
    return new Promise(resolve => {
      this.http.post(`${URL}/actuacion/delete/${idActuacion}`, null).subscribe((resp: any) => {
        if (resp.ok) {
          this.nuevaActuacion.emit(resp.actuacion);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
