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

  subirAutor(autor: string, idCancion: number):Observable<any>{
    var url = "https://upbeatproyect.herokuapp.com/artista/createSong/"+autor+"/"+idCancion;
    return this.http.put<any>(url,httpOptions);
  }

  listarCanciones():Observable<any>{
    return this.http.get(this.UrlAllSongs,httpOptions);
  }

  marcarFavorito(autor: string, idCancion: number):Observable<any>{
    var url = "https://upbeatproyect.herokuapp.com/cliente/favSong/"+autor+"/"+idCancion;
    return this.http.put<any>(url,httpOptions);
  }

  listarFavoritos(correo: string):Observable<any>{
    var url = "https://upbeatproyect.herokuapp.com/cliente/songsFavPlaylist/"+correo;
    return this.http.get(url,httpOptions);
  }

  desmarcarFavorito(autor: string, idCancion: number):Observable<any>{
    var url = "https://upbeatproyect.herokuapp.com/cliente/eliminateFavSong/"+autor+"/"+idCancion;
    return this.http.put<any>(url,httpOptions);
  }

  esFavorito(autor: string, idCancion: number):Observable<any>{
    var url = "https://upbeatproyect.herokuapp.com/cliente/markFavSong/"+autor+"/"+idCancion;
    return this.http.get(url,httpOptions);
  }
  
}
