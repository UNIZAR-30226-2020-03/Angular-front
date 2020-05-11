import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancion } from '../MODELO/Cancion';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StreamingService {

  UrlSubida='https://upbeatproyect.herokuapp.com/cancion/save';
  UrlAllSongs='https://upbeatproyect.herokuapp.com/cancion/allSongs';

  constructor(private http: HttpClient) { }

  subirCancion(cancion: Cancion):Observable<any>{
    var myString = JSON.stringify(cancion);
    return this.http.post<any>(this.UrlSubida,myString,httpOptions);
  }

  listarCanciones():Observable<any>{
    return this.http.get(this.UrlAllSongs,httpOptions);
  }
}
