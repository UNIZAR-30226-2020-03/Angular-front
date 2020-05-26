import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Usuario } from '../MODELO/Usuario';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';
import { Playlist } from '../MODELO/Playlist';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StreamingService } from '../Service/streaming.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  @Output() idPlaylistActual = new EventEmitter<number>();
  @Output() nombrePlaylistActual = new EventEmitter<string>();

  usuario : Usuario = new Usuario();
  playlistsBD: Playlist[];

  modoVisualizacion: String = "recientes";
  usuarioActual: Usuario;
  
  constructor(private router:Router, private service:ServiceService,private serviceStream:StreamingService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usuarioActual = this.service.getUserLoggedIn();
    if(this.router.url === '/inicio'){
      this.modoComponente(0);
    }
    else if (this.router.url === '/playlists'){
      this.modoComponente(1);
    }
  }

  modoComponente(mode){
    if(mode == 0){
      this.modoVisualizacion = "inicio";
      this.obtenerTodasPlaylists();
    }
    else if (mode == 1){
      this.modoVisualizacion = "misPlaylists";
      this.obtenerMisPlaylists();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  obtenerTodasPlaylists(){
    this.service.listarTodasPlaylists().subscribe(data => {
      this.playlistsBD = data;
      error: error => alert("Se ha producido un error");
      var i = 0;
      while(this.playlistsBD[i]!=null){
        this.obtenerAutorPlaylist(this.playlistsBD[i].id,i);
        i++;
      }
    })
  }

  obtenerMisPlaylists(){
    this.service.misPlaylists().subscribe(data => {
      this.playlistsBD = data;
      error: error => alert("Se ha producido un error");
      var i = 0;
      while(this.playlistsBD[i]!=null){
        this.obtenerAutorPlaylist(this.playlistsBD[i].id,i);
        i++;
      }
    })
  }

  listarCancionesPlaylist(playlist : Playlist){
    this.idPlaylistActual.emit(playlist.id);
    this.nombrePlaylistActual.emit(playlist.nombre);
  }

  eliminarPlaylist(idPlaylist){
    var r = confirm("¿Estás seguro de que quieres eliminar esta playlist?");
    if (r == true) {
      this.service.borrarPlaylist(idPlaylist).subscribe(data => {
        error: error => alert("Se ha producido un error");
        var mensaje = "La playlist se ha eliminado";
        this.openSnackBar(mensaje, "OK");
      })
    } 
  }

  obtenerAutorPlaylist(idPlaylist,i){
    this.service.autorPlaylist(idPlaylist).subscribe(data => {
      this.playlistsBD[i].creador = data.nombre + " " + data.apellidos;
      error: error => alert("Se ha producido un error");
    })
  }

  anyadirPlaylistCola(i: number){
    this.serviceStream.anyadirPlaylistCola(this.usuarioActual.correo, this.playlistsBD[i].id).subscribe(data => {
      error: error => alert("Se ha producido un error");
      var mensaje = "La playlist se ha añadido a la cola de reproducción";
      this.openSnackBar(mensaje, "OK");
      this.serviceStream.verCola(this.usuarioActual.correo).subscribe(data => {
        console.log(data);
      })
    })
  }

}
