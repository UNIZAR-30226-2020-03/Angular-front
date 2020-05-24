import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../MODELO/Usuario';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Playlist } from '../MODELO/Playlist';

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
  
  UrlReg='https://upbeatproyect.herokuapp.com/usuario/save';
  UrlRegArtista='https://upbeatproyect.herokuapp.com/artista/save';

  registrarUsuario(usuario: Usuario):Observable<any>{
    var myString = JSON.stringify(usuario);
    return this.http.post<any>(this.UrlReg,myString,httpOptions);
  }

  registrarArtista(usuario: Usuario):Observable<any>{
    var myString = JSON.stringify(usuario);
    return this.http.post<any>(this.UrlRegArtista,myString,httpOptions);
  }

  loginUsuario(correo,contrasenya):Observable<any>{
    var UrlLog = "https://upbeatproyect.herokuapp.com/cliente/get/"+contrasenya+"/"+correo;
    return this.http.get(UrlLog,httpOptions);
  }

  esArtista(correo: string):Observable<any>{
    var UrlLog = "https://upbeatproyect.herokuapp.com/artista/get/"+correo;
    return this.http.get(UrlLog,httpOptions);
  }

  recuperarUsuario(correo):Observable<any>{
    var UrlLog = "https://upbeatproyect.herokuapp.com/cliente/get/"+correo;
    return this.http.get(UrlLog,httpOptions);
  }

  listarUsuarios():Observable<any>{
    var UrlLog = "https://upbeatproyect.herokuapp.com/cliente/allClientes";
    return this.http.get(UrlLog,httpOptions);
  }

  listarUsuariosSiguiendo(miCorreo):Observable<any>{
    var UrlLog = "https://upbeatproyect.herokuapp.com/cliente/followingList/"+miCorreo;
    return this.http.get(UrlLog,httpOptions);
  }

  setUserLoggedIn(user: Usuario) {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  actualizarUsuario(user: Usuario){
    var UrlLog = "https://upbeatproyect.herokuapp.com/usuario/updateUser/"+user.correo;
    var myString = JSON.stringify(user);
    this.setUserLoggedIn(user);
    return this.http.put(UrlLog,myString,httpOptions);
  }

  getUserLoggedIn() {
  	return JSON.parse(localStorage.getItem('currentUser'));
  }

  esAmigo(miCorreo, suCorreo):Observable<any>{
    var UrlLog = "https://upbeatproyect.herokuapp.com/cliente/following/"+miCorreo+"/"+suCorreo;
    return this.http.get(UrlLog,httpOptions);
  }

  seguirUsuario(miCorreo, suCorreo):Observable<any>{
    var UrlLog = "https://upbeatproyect.herokuapp.com/cliente/follow/"+miCorreo+"/"+suCorreo;
    return this.http.put(UrlLog,httpOptions);
  }

  dejarDeSeguirUsuario(miCorreo, suCorreo):Observable<any>{
    var UrlLog = "https://upbeatproyect.herokuapp.com/cliente/unfollow/"+miCorreo+"/"+suCorreo;
    return this.http.put(UrlLog,httpOptions);
  }

  obtenerIdPlaylist(playlist : Playlist){

    var UrlLog = "https://upbeatproyect.herokuapp.com/playlist/save/";
    var myString = JSON.stringify(playlist);
    return this.http.post(UrlLog,myString,httpOptions); 
  }

  crearPlaylist(idPlaylist){
    
    var UrlLog = "https://upbeatproyect.herokuapp.com/cliente/createPlaylist/";
    this.usserLogged = this.getUserLoggedIn();
    return this.http.put(UrlLog+this.usserLogged.correo+"/"+idPlaylist,httpOptions);
  }

  misPlaylists(){

    this.usserLogged = this.getUserLoggedIn();
    var UrlLog = "https://upbeatproyect.herokuapp.com/cliente/myPlaylists/"+this.usserLogged.correo;
    return this.http.get<Playlist[]>(UrlLog,httpOptions);
  }

  listarTodasPlaylists(){
    var UrlLog = "https://upbeatproyect.herokuapp.com/playlist/allPlaylists";
    return this.http.get<Playlist[]>(UrlLog,httpOptions);
  }

  borrarPlaylist(idPlaylist){
    var UrlLog = "https://upbeatproyect.herokuapp.com/playlist/delete/"+idPlaylist;
    return this.http.delete(UrlLog,httpOptions);
  }

  infoPlaylist(idPlaylist){
    var UrlLog = "https://upbeatproyect.herokuapp.com/playlist/get/"+idPlaylist;
    return this.http.get(UrlLog,httpOptions);
  }

}
