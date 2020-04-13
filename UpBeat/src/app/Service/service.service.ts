import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../MODELO/Usuario';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }
  
  Url='http://upbeatproyect.herokuapp.com/cliente/save';

  registrarUsuario(usuario:Usuario){
    return this.http.post<Usuario>(this.Url,usuario);
  }

}


