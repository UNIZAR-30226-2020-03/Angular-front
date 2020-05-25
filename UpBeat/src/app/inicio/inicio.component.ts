import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  idPlaylist: number;
  nombrePlaylist: string;

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

  cambiarVisualizacion(){
    if(this.modoVisualizacion == "inicio"){
      this.modoVisualizacion = "canciones";
    }
    else{
      this.modoVisualizacion = "inicio";
    }
  }

  setIdPlaylist(id : number){
    this.idPlaylist = id;
  }

  setNombrePlaylist(name : string){
    this.nombrePlaylist = name;
  }

}
