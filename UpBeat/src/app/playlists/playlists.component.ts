import { Component, OnInit, Output, EventEmitter, Inject, Input } from '@angular/core';
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

  @Output() cancion = new EventEmitter<string>();
  @Output() URL = new EventEmitter<string>();

  @Input() cadenaBusqueda: string;

  usuario : Usuario = new Usuario();
  playlistsBD: Playlist[];
  primero : Boolean = true;

  favoritos: boolean[] = [false];
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
    else if (this.router.url === '/favoritos'){
      this.modoComponente(2);
    }
    else if (this.router.url === '/buscar'){
      this.modoComponente(3);
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
    else if (mode == 2){
      this.modoVisualizacion = "favoritos";
      this.listarPlaylistsFavoritas();
    }
    else if (mode == 3){
      this.modoVisualizacion = "buscar";
      this.obtenerTodasPlaylists();
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
      if(this.modoVisualizacion == "buscar"){
        this.buscar();
      }
      error: error => alert("Se ha producido un error");
      var i = 0;
      while(this.playlistsBD[i]!=null){
        this.obtenerAutorPlaylist(this.playlistsBD[i].id,i);
        this.esFavorita(i,this.usuarioActual.correo,this.playlistsBD[i].id);
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
        this.esFavorita(i,this.usuarioActual.correo,this.playlistsBD[i].id);
        i++;
      }
    })
  }

  listarPlaylistsFavoritas(): void{
    this.service.listarPlaylistsFavoritas(this.usuarioActual.correo).subscribe(data => {
      this.playlistsBD = data;
      error: error => alert("Se ha producido un error");
      var i = 0;
      while(this.playlistsBD[i]!=null){
        this.favoritos[i] = true;
        i++;
      }
  })
  }

  esFavorita(i,miCorreo,id){
    this.service.esPlaylistFavorita(miCorreo,id).subscribe(data => {
      error: error => alert("Se ha producido un error");
      if(data == 0){
        this.favoritos[i] = true;
      }
      else{   //data == 1 OR 2
        this.favoritos[i] = false;
      }
    })
  }

  marcarPlaylistFavorita(i,id){
    this.service.marcarPlaylistFavorita(this.usuarioActual.correo,id).subscribe(data => {
      error: error => alert("Se ha producido un error");
      if(data == 0){
        this.favoritos[i] = true;
        var mensaje = "Ahora '"+this.playlistsBD[i].nombre+"' está en tus favoritos";
        this.openSnackBar(mensaje, "OK");
      }
    })
  }

  desmarcarPlaylistFavorita(i,id){
    this.service.desmarcarPlaylistFavorita(this.usuarioActual.correo,id).subscribe(data => {
      error: error => alert("Se ha producido un error");
      if(data == 0){
        this.favoritos[i] = false;
        var mensaje = "'"+this.playlistsBD[i].nombre+"' ya no está en tus favoritos";
        this.openSnackBar(mensaje, "OK");
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

  buscar(){
    var cadenaBusqueda = this.cadenaBusqueda.toLowerCase();
    var i = 0;
    while(this.playlistsBD[i]!=null){
      var cancionTitulo = this.playlistsBD[i].nombre;
      var cancionComprobacion = cancionTitulo.toLowerCase();
      if (!cancionComprobacion.includes(cadenaBusqueda)){
        this.playlistsBD.splice(i, 1);
      }
      else i++;
    }
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

  playPlaylistCola(i: number){
    if(this.primero){
      this.primero = false;
      this.serviceStream.reproducirPlaylist(this.usuarioActual.correo, this.playlistsBD[i].id).subscribe(data => {
        error: error => alert("Se ha producido un error");
        console.log(data);
        var aux = data["cancion"];
        var src = aux["pathMp3"];
        var nombre = aux["nombre"].toString();
        this.cancion.emit(nombre);
        this.URL.emit(src);
        this.serviceStream.play(this.usuarioActual.correo).subscribe(data => {
          error: error => alert("Se ha producido un error");
          console.log(data);
          this.serviceStream.verCola(this.usuarioActual.correo).subscribe(data => {
            console.log(data);
          })
        })
      })
    }
    else{
      this.serviceStream.reproducirPlaylist(this.usuarioActual.correo, this.playlistsBD[i].id).subscribe(data => {
        error: error => alert("Se ha producido un error");
        console.log(data);
        var aux = data["cancion"];
        var src = aux["pathMp3"];
        var nombre = aux["nombre"].toString();
        this.cancion.emit(nombre);
        this.URL.emit(src);
        this.serviceStream.verCola(this.usuarioActual.correo).subscribe(data => {
          console.log(data);
        })
      })
    }
  }

}
