import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../MODELO/Usuario';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  usuario : Usuario = new Usuario();

  modoVisualizacion: String = "inicio";
  idPlaylist: number;
  nombrePlaylist: string;
  idAlbum: number;
  nombreAlbum: string;

  @Output() cancionActual = new EventEmitter<string>();
  @Output() URL = new EventEmitter<string>();

  constructor(private router:Router, private service:ServiceService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.usuario = this.service.getUserLoggedIn();
  }

  cambiarVisualizacion(){
    if(this.modoVisualizacion == "inicio"){
      this.modoVisualizacion = "canciones";
    }
    else{
      this.modoVisualizacion = "inicio";
    }
  }

  actualizarCancionActual(nombre: string){
    this.cancionActual.emit(nombre);
  }

  play(URL: string){
    this.URL.emit(URL);
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
