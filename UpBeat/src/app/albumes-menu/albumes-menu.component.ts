import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { MatDialog } from '@angular/material/dialog';
import { Album } from '../MODELO/Album';
import { Artista } from '../MODELO/Artista';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-albumes-menu',
  templateUrl: './albumes-menu.component.html',
  styleUrls: ['./albumes-menu.component.css']
})
export class AlbumesMenuComponent implements OnInit {

  usuario : Artista = new Artista();

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
    const dialogRef = this.dialog.open(popUp2);
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
    this.cancionActual.emit(nombre);
  }

  play(URL: string){
    this.URL.emit(URL);
  }

}


@Component({
  selector: 'popUp2',
  templateUrl: 'popUp2.html',
})
export class popUp2 {

  constructor(private router:Router ,private service:ServiceService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  album : Album = new Album();
  idAlbum : String;

  crearAlbum(){
    if (this.album.nombre != null){
      this.service.obtenerIdAlbum(this.album).subscribe(data =>{
        this.idAlbum = data["id"];
        this.crearAlbumAux(this.idAlbum);
      });;
    }
    else{
      var mensaje = "El nombre del álbum no puede ser vacío";
      this.openSnackBar(mensaje, "OK");
    }
  }

  crearAlbumAux(idAlbum){
    this.service.crearAlbum(idAlbum).subscribe(data => {
      error: error => alert("Se ha producido un error");
      var mensaje = "El álbum '"+this.album.nombre+"' se ha creado";
      this.openSnackBar(mensaje, "OK");
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
