import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../MODELO/Usuario';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Playlist } from '../MODELO/Playlist';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-playlists-menu',
  templateUrl: './playlists-menu.component.html',
  styleUrls: ['./playlists-menu.component.css']
})
export class PlaylistsMenuComponent implements OnInit {

  usuario : Usuario = new Usuario();

  modoVisualizacion: String = "albumes";
  idPlaylist: number;
  nombrePlaylist: string;

  @Output() cancionActual = new EventEmitter<string>();
  @Output() URL = new EventEmitter<string>();
  
  constructor(private router:Router, private service:ServiceService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.usuario = this.service.getUserLoggedIn();
  }

  openDialog() {
    const dialogRef = this.dialog.open(popUp);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  cambiarVisualizacion(){
    if(this.modoVisualizacion == "albumes"){
      this.modoVisualizacion = "canciones";
    }
    else{
      this.modoVisualizacion = "albumes";
    }
  }

  setIdPlaylist(id : number){
    this.idPlaylist = id;
  }

  setNombrePlaylist(name : string){
    this.nombrePlaylist = name;
  }

  actualizarCancionActual(nombre: string){
    console.log(nombre);
    this.cancionActual.emit(nombre);
  }

  play(URL: string){
    console.log(URL);
    this.URL.emit(URL);
  }

}


@Component({
  selector: 'popUp',
  templateUrl: 'popUp.html',
})
export class popUp {

  constructor(private router:Router ,private service:ServiceService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

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
      var mensaje = "El nombre de la playlist no puede ser vacío";
      this.openSnackBar(mensaje, "OK");
    }
  }

  crearPlaylistAux(idPlaylist){
    this.service.crearPlaylist(idPlaylist).subscribe(data => {
      error: error => alert("Se ha producido un error");
      var mensaje = "La playlist '"+this.playlist.nombre+"' se ha creado";
      this.openSnackBar(mensaje, "OK");
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
