import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Artista } from '../MODELO/Artista';
import { ServiceService } from '../Service/service.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Album } from '../MODELO/Album';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.component.html',
  styleUrls: ['./albumes.component.css']
})
export class AlbumesComponent implements OnInit {

  @Output() idAlbumActual = new EventEmitter<number>();
  @Output() nombreAlbumActual = new EventEmitter<string>();

  modoVisualizacion: String = "albumes";

  artista : Artista = new Artista();
  albumesBD : Album[];

  constructor(private router:Router, private service:ServiceService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.artista = this.service.getUserLoggedIn();
    this.obtenerMisAlbumesArtista();
    if(this.router.url === '/inicio'){
      this.modoComponente(0);
    }
    else if (this.router.url === '/albumesArtista'){
      this.modoComponente(1);
    }
  }

  modoComponente(mode){
    if(mode == 0){
      this.modoVisualizacion = "albumes";
      this.obtenerTodosAlbumes();
    }
    else if (mode == 1){
      this.modoVisualizacion = "misAlbumsArtista";
      this.obtenerMisPlaylists();
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
      console.log(data);
      error: error => alert("Se ha producido un error");
    })
  }

  obtenerTodosAlbumes(){
    this.service.listarTodosAlbums().subscribe(data => {
      this.albumesBD = data;
      error: error => alert("Se ha producido un error");
    })
  }

  obtenerMisPlaylists(){
    this.service.misPlaylists().subscribe(data => {
      this.albumesBD = data;
      error: error => alert("Se ha producido un error");
    })
  }

  listarCancionesAlbum(album : Album){
    this.idAlbumActual.emit(album.id);
    this.nombreAlbumActual.emit(album.nombre);
  }

  eliminarPlaylist(idAlbum){
    var r = confirm("¿Estás seguro de que quieres eliminar esta playlist?");
    if (r == true) {
      this.service.borrarPlaylist(idAlbum).subscribe(data => {
        error: error => alert("Se ha producido un error");
        var mensaje = "La playlist se ha eliminado";
        this.openSnackBar(mensaje, "OK");
      })
    } 
  }

  /*
  obtenerAutorPlaylist(idPlaylist){
    var autor;
    this.service.infoPlaylist(idPlaylist).subscribe(data => {
      var aux = data["creador"];
      console.log(data);
      error: error => alert("Se ha producido un error");
    })
  }
  */
}
