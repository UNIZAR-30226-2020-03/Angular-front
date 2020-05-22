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
  cancionesBD: Cancion[];
  constructor(private router:Router, private service:ServiceService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  play(i: number){
    this.URL.emit(this.cancionesBD[i].pathMp3);
    this.cancion.emit(this.cancionesBD[i].nombre);
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

}


@Component({
  selector: 'popUp',
  templateUrl: 'popUp.html',
})
export class popUp {

  constructor(private router:Router, private service:ServiceService,public dialog: MatDialog) { }

  playlist : Playlist = new Playlist();

  crearPlaylist(){

  this.service.crearPlaylist(this.playlist).subscribe(data=>{
      error: error => alert("Se ha producido un error al actualizar datos");
    })
  }
}