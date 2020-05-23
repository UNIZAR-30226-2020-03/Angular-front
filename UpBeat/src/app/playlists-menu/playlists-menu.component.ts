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

  constructor(private router:Router, private service:ServiceService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerPlaylists();
    this.obtenerTodasPlaylists();

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
      console.log(this.playlistsBD);
      error: error => alert("Se ha producido un error");
    })
  }

  obtenerTodasPlaylists(){

    this.service.listarTodasPlaylists().subscribe(data => {
      this.allPlaylistsBD = data;
      console.log(this.allPlaylistsBD);
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

  crearPlaylist(){
    if (this.playlist.nombre != null){
      this.service.crearPlaylist(this.playlist);
    }
    else{
      alert("El nombre de la playlist no puede ser vacío");
    }
  }
}