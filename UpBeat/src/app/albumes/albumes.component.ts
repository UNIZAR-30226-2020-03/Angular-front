import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Artista } from '../MODELO/Artista';
import { ServiceService } from '../Service/service.service';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Album } from '../MODELO/Album';


@Component({
  selector: 'app-albumes',
  templateUrl: './albumes.component.html',
  styleUrls: ['./albumes.component.css']
})
export class AlbumesComponent implements OnInit {

  artista : Artista = new Artista();
  albumesBD : Album[];
  constructor(private router:Router, private service:ServiceService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.obtenerAlbumes();
  }

  getNombreUsuario(){
    this.artista = this.service.getUserLoggedIn();
    return this.artista.nombre;
  }

  openDialog() {
    const dialogRef = this.dialog.open(popUp2);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  obtenerAlbumes(){
    this.service.lsitarAlbumes().subscribe(data => {
      this.albumesBD = data;
      console.log(data);
      error: error => alert("Se ha producido un error");
    })
  }
}


@Component({
  selector: 'popUp2',
  templateUrl: 'popUp2.html',
})
export class popUp2 {

  constructor(private router:Router ,private service:ServiceService,public dialog: MatDialog) { }

  album : Album = new Album();
  idAlbum : String;

  crearAlbum(){
    if (this.album.nombre != null){
      this.service.obtenerIdPlaylist(this.album).subscribe(data =>{
        this.idAlbum = data["id"];
        this.crearAlbumAux(this.idAlbum);
      });;
    }
    else{
      alert("El nombre de la playlist no puede ser vacío");
    }
  }

  crearAlbumAux(idAlbum){
    this.service.crearPlaylist(idAlbum).subscribe(data => {
      error: error => alert("Se ha producido un error");
    })
  }

}