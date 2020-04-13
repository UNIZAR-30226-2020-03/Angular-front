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

  constructor(private http: HttpClient) { }
  
  Url='http://upbeatproyect.herokuapp.com/cliente/save';

  registrarUsuario(usuario: Usuario):Observable<any>{
    var myString = JSON.stringify(usuario);
    alert(myString);
    return this.http.post<any>(this.Url,myString,httpOptions);
  }

}
