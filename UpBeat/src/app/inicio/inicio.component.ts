import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  idPlaylist: number;
  nombrePlaylist: string;
  idAlbum: number;
  nombreAlbum: string;

  @Output() cancionActual = new EventEmitter<string>();
  @Output() URL = new EventEmitter<string>();

  modoVisualizacion: String = "inicio";

  constructor() { }

  actualizarCancionActual(nombre: string){
    this.cancionActual.emit(nombre);
  }

  play(URL: string){
    this.URL.emit(URL);
  }

  ngOnInit(): void {
  }

  cambiarVisualizacion(tipo: string){
    if(tipo == "album"){
      if(this.modoVisualizacion == "inicio"){
        this.modoVisualizacion = "canciones-album";
      }
      else{
        this.modoVisualizacion = "inicio";
      }
    }
    else{   //tipo == "playlist"
      if(this.modoVisualizacion == "inicio"){
        this.modoVisualizacion = "canciones-playlist";
      }
      else{
        this.modoVisualizacion = "inicio";
      }
    }
  }

  setIdPlaylist(id : number){
    this.idPlaylist = id;
  }

  setNombrePlaylist(name : string){
    this.nombrePlaylist = name;
  }

  setIdAlbum(id : number){
    this.idAlbum = id;
  }

  setNombreAlbum(name : string){
    this.nombreAlbum = name;
  }

}
