import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../MODELO/Usuario';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Playlist } from '../MODELO/Playlist';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseStorageService } from '../firebase-storage.service'
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';



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

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  constructor(private firebaseStorage:FirebaseStorageService ,private service:ServiceService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  playlist : Playlist = new Playlist();
  idPlaylist : String;
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  public cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }

  crearPlaylist(){
    if (this.playlist.nombre != null){
      if(this.playlist.pathImg == null){
        this.playlist.pathImg="assets/PlaylistDefecto.jpeg"
      }
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

  public subirArchivo() {
    let archivo = this.datosFormulario.get('archivo');
    let tarea = this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo);

    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
      }
    });

    tarea.snapshotChanges().pipe(
      finalize(() => this.obtenerURL())
    )
    .subscribe()
  }

  obtenerURL(){
    let referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
    referencia.getDownloadURL().subscribe((URL) => {
      this.URLPublica = URL;
      this.playlist.pathImg = this.URLPublica;
    });
  }

}
