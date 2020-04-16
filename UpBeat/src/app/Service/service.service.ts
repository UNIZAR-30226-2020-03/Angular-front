import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../MODELO/Usuario';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private isUserLoggedIn;
  public usserLogged: Usuario;

  constructor(private http: HttpClient) { }
  
  UrlReg='http://upbeatproyect.herokuapp.com/cliente/save';

  registrarUsuario(usuario: Usuario):Observable<any>{
    var myString = JSON.stringify(usuario);
    return this.http.post<any>(this.UrlReg,myString,httpOptions);
  }

  loginUsuario(correo,contrasenya):Observable<any>{
    var UrlLog = "http://upbeatproyect.herokuapp.com/cliente/get/"+contrasenya+"/"+correo;
    return this.http.get(UrlLog,httpOptions);
  }

  setUserLoggedIn(user: Usuario) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUserLoggedIn() {
  	return JSON.parse(localStorage.getItem('currentUser'));
  }

}
