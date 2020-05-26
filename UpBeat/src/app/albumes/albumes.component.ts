import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Artista } from '../MODELO/Artista';
import { ServiceService } from '../Service/service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Album } from '../MODELO/Album';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StreamingService } from '../Service/streaming.service';


@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.component.html',
  styleUrls: ['./albumes.component.css']
})
export class AlbumesComponent implements OnInit {

  @Output() idAlbumActual = new EventEmitter<number>();
  @Output() nombreAlbumActual = new EventEmitter<string>();

  @Output() cancion = new EventEmitter<string>();
  @Output() URL = new EventEmitter<string>();

  favoritos: boolean[] = [false];
  modoVisualizacion: String = "albumes";

  artista : Artista = new Artista();
  albumesBD : Album[];
  primero : Boolean = true;

  constructor(private router:Router, private service:ServiceService,private serviceStream:StreamingService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.artista = this.service.getUserLoggedIn();
    if(this.router.url === '/inicio'){
      this.modoComponente(0);
    }
    else if (this.router.url === '/albumesArtista'){
      this.modoComponente(1);
    }
    else if (this.router.url === '/favoritos'){
      this.modoComponente(2);
    }
  }

  modoComponente(mode){
    if(mode == 0){
      this.modoVisualizacion = "albumes";
      this.obtenerTodosAlbumes();
    }
    else if (mode == 1){
      this.modoVisualizacion = "misAlbumesArtista";
      this.obtenerMisAlbumesArtista();
    }
    else if (mode == 2){
      this.modoVisualizacion = "misAlbumesFavoritos";
      this.listarAlbumesFavoritos();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  obtenerMisAlbumesArtista(){
    this.service.listarMisAlbumes().subscribe(data => {
      this.albumesBD = data;
      error: error => alert("Se ha producido un error");
      var i = 0;
      while(this.albumesBD[i]!=null){
        this.obtenerAutorAlbum(this.albumesBD[i].id,i);
        this.esFavorito(i,this.artista.correo,this.albumesBD[i].id);
        i++;
      }
    })
  }

  obtenerTodosAlbumes(){
    this.service.listarTodosAlbums().subscribe(data => {
      this.albumesBD = data;
      error: error => alert("Se ha producido un error");
      var i = 0;
      while(this.albumesBD[i]!=null){
        this.obtenerAutorAlbum(this.albumesBD[i].id,i);
        this.esFavorito(i,this.artista.correo,this.albumesBD[i].id);
        i++;
      }
    })
  }

  listarAlbumesFavoritos(): void{
    this.service.listarAlbumesFavoritos(this.artista.correo).subscribe(data => {
      this.albumesBD = data;
      error: error => alert("Se ha producido un error");
      var i = 0;
      while(this.albumesBD[i]!=null){
        this.favoritos[i] = true;
        i++;
      }
  })
  }

  esFavorito(i,miCorreo,id){
    this.service.esAlbumFavorito(miCorreo,id).subscribe(data => {
      error: error => alert("Se ha producido un error");
      if(data == 0){
        this.favoritos[i] = true;
      }
      else{   //data == 1 OR 2
        this.favoritos[i] = false;
      }
    })
  }

  marcarAlbumFavorito(i,id){
    this.service.marcarAlbumFavorito(this.artista.correo,id).subscribe(data => {
      error: error => alert("Se ha producido un error");
      if(data == 0){
        this.favoritos[i] = true;
        var mensaje = "Ahora '"+this.albumesBD[i].nombre+"' está en tus favoritos";
        this.openSnackBar(mensaje, "OK");
      }
    })
  }

  desmarcarAlbumFavorito(i,id){
    this.service.desmarcarAlbumFavorito(this.artista.correo,id).subscribe(data => {
      error: error => alert("Se ha producido un error");
      if(data == 0){
        this.favoritos[i] = false;
        var mensaje = "'"+this.albumesBD[i].nombre+"' ya no está en tus favoritos";
        this.openSnackBar(mensaje, "OK");
      }
    })
  }

  listarCancionesAlbum(album : Album){
    this.idAlbumActual.emit(album.id);
    this.nombreAlbumActual.emit(album.nombre);
  }

  eliminarAlbum(idAlbum){
    var r = confirm("¿Estás seguro de que quieres eliminar este álbum?");
    if (r == true) {
      this.service.borrarAlbum(idAlbum).subscribe(data => {
        error: error => alert("Se ha producido un error");
        var mensaje = "El álbum se ha eliminado";
        this.openSnackBar(mensaje, "OK");
      })
    } 
  }

  obtenerAutorAlbum(idAlbum,i){
    this.service.autorPlaylist(idAlbum).subscribe(data => {
      this.albumesBD[i].creador = data.nombre + " " + data.apellidos;
      error: error => alert("Se ha producido un error");
    })
  }

  anyadirAlbumCola(i: number){
    this.serviceStream.anyadirAlbumCola(this.artista.correo, this.albumesBD[i].id).subscribe(data => {
      error: error => alert("Se ha producido un error");
      var mensaje = "El álbum se ha añadido a la cola de reproducción";
      this.openSnackBar(mensaje, "OK");
      this.serviceStream.verCola(this.artista.correo).subscribe(data => {
        console.log(data);
      })
    })
  }

  playAlbumCola(i: number){
    if(this.primero){
      this.primero = false;
      this.serviceStream.reproducirAlbum(this.artista.correo, this.albumesBD[i].id).subscribe(data => {
        error: error => alert("Se ha producido un error");
        console.log(data);
        var aux = data["cancion"];
        var src = aux["pathMp3"];
        var nombre = aux["nombre"].toString();
        this.cancion.emit(nombre);
        this.URL.emit(src);
        this.serviceStream.play(this.artista.correo).subscribe(data => {
          error: error => alert("Se ha producido un error");
          console.log(data);
          this.serviceStream.verCola(this.artista.correo).subscribe(data => {
            console.log(data);
          })
        })
      })
    }
    else{
      this.serviceStream.reproducirAlbum(this.artista.correo, this.albumesBD[i].id).subscribe(data => {
        error: error => alert("Se ha producido un error");
        console.log(data);
        var aux = data["cancion"];
        var src = aux["pathMp3"];
        var nombre = aux["nombre"].toString();
        this.cancion.emit(nombre);
        this.URL.emit(src);
        this.serviceStream.verCola(this.artista.correo).subscribe(data => {
          console.log(data);
        })
      })
    }
  }

}
