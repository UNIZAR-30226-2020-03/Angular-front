import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancion } from '../MODELO/Cancion';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const httpOptions2 = {
  headers: new HttpHeaders({
    'Content-Type': 'text/plain'
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

  reproducirCancionId(idCancion: number):Observable<any>{
    var url = "https://upbeatproyect.herokuapp.com/cancion/getStreamUrlMp3byId/"+idCancion;
    return this.http.get(url,httpOptions2);
  }
 /////////////////////////////
 ////// COLA CANCIONES ///////
 /////////////////////////////
  play(correo: string){
    var url = "https://upbeatproyect.herokuapp.com/cliente/play/"+correo;
    return this.http.get(url,httpOptions);
  }

  pause(correo, segundo){
    var url = "https://upbeatproyect.herokuapp.com/cliente/pause/"+correo+"/"+segundo;
    this.http.put(url,httpOptions);
  }

  reproducirCancion(correo: string,idSong: number){
    var url = "https://upbeatproyect.herokuapp.com/cliente/reproducirCancion/"+correo+"/"+idSong;
    return this.http.put(url,httpOptions);
  }
  
  next(correo: string){
    console.log("next");
    var url = "https://upbeatproyect.herokuapp.com/cliente/next/"+correo;
    return this.http.put<Cancion>(url,httpOptions);
  }

  anyadirCancionCola(correo,idSong){
    var url = "https://upbeatproyect.herokuapp.com/cliente/addCancionCola/"+correo+"/"+idSong;
    return this.http.put(url,httpOptions);
  }

  verCola(correo){
    var url = "https://upbeatproyect.herokuapp.com/cliente/getCancionesCola/"+correo;
    return this.http.get<Cancion[]>(url,httpOptions);
  }

 ////////////////////////////////////////
 ////// COLA ALBUMES Y PLAYLIST /////////
 ////////////////////////////////////////
 anyadirAlbumCola(correo: string,idAlbum: number){
  var url = "https://upbeatproyect.herokuapp.com/cliente/addAlbumCola/"+correo+"/"+idAlbum;
  return this.http.put(url,httpOptions);
 }

 anyadirPlaylistCola(correo: string,idPlaylist: number){
  var url = "https://upbeatproyect.herokuapp.com/cliente/addPlaylistCola/"+correo+"/"+idPlaylist;
  return this.http.put(url,httpOptions);
 }

}
