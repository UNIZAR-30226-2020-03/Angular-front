import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../MODELO/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
  
  Url='http://localhost:8080';

  registrarUsuario(usuario:Usuario){
    return this.http.post<Usuario>(this.Url,usuario);
  }

}


