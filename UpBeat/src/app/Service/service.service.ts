import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../MODELO/Usuario';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ServiceService {

  constructor(private http:HttpClient) { }
  
  Url='https://upbeatproyect.herokuapp.com/cliente/save';

  registrarUsuario(usuario:Usuario){
    return this.http.post<Usuario>(this.Url,usuario);
  }

}


