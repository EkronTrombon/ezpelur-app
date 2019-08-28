import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  getUsuario(id: string) {
    return this.http.get(`${URL}/user/${id}`);
  }

  getUsuarios() {
    return this.http.get(`${URL}/user`);
  }
}
