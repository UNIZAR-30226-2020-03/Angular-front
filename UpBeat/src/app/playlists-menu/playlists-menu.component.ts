import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Usuario } from '../MODELO/Usuario';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';
import { Cancion } from '../MODELO/Cancion';
import { StreamingService } from '../Service/streaming.service';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Playlist } from '../MODELO/Playlist';

@Component({
  selector: 'app-playlists-menu',
  templateUrl: './playlists-menu.component.html',
  styleUrls: ['./playlists-menu.component.css']
})
export class PlaylistsMenuComponent implements OnInit {

  @Output() cancion = new EventEmitter<string>();
  @Output() URL = new EventEmitter<string>();

  usuario : Usuario = new Usuario();
  playlistsBD: Playlist[];
  allPlaylistsBD: Playlist[];
  allAutores : Usuario[];

  constructor(private router:Router, private service:ServiceService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerPlaylists();
  }


  getNombreUsuario(){
    this.usuario = this.service.getUserLoggedIn();
    return this.usuario.nombre;
  }

  openDialog() {
    const dialogRef = this.dialog.open(popUp);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  obtenerPlaylists(){

    this.service.misPlaylists().subscribe(data => {
      this.playlistsBD = data;
      error: error => alert("Se ha producido un error");
    })
  }

  obtenerTodasPlaylists(){

    this.service.listarTodasPlaylists().subscribe(data => {
      this.allPlaylistsBD = data;
      error: error => alert("Se ha producido un error");
    })
  }

  eliminarPlaylist(idPlaylist){
    var r = confirm("¿Estás seguro de que quieres eliminar esta playlist?");
    if (r == true) {
      this.service.borrarPlaylist(idPlaylist).subscribe(data => {
        error: error => alert("Se ha producido un error");
      })
    } 
  }

  obtenerAutorPlaylist(idPlaylist){
    var autor;
    this.service.infoPlaylist(idPlaylist).subscribe(data => {
      var aux = data["creador"];
      console.log(data);
      error: error => alert("Se ha producido un error");
    })
  }

}


@Component({
  selector: 'popUp',
  templateUrl: 'popUp.html',
})
export class popUp {

  constructor(private router:Router ,private service:ServiceService,public dialog: MatDialog) { }

  playlist : Playlist = new Playlist();
  idPlaylist : String;

  crearPlaylist(){
    if (this.playlist.nombre != null){
      this.service.obtenerIdPlaylist(this.playlist).subscribe(data =>{
        this.idPlaylist = data["id"];
        this.crearPlaylistAux(this.idPlaylist);
      });;
    }
    else{
      alert("El nombre de la playlist no puede ser vacío");
    }
  }

  crearPlaylistAux(idPlaylist){
    this.service.crearPlaylist(idPlaylist).subscribe(data => {
      error: error => alert("Se ha producido un error");
    })
  }
}