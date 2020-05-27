import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { MatDialog } from '@angular/material/dialog';
import { Album } from '../MODELO/Album';
import { Artista } from '../MODELO/Artista';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseStorageService } from '../firebase-storage.service'
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-albumes-menu',
  templateUrl: './albumes-menu.component.html',
  styleUrls: ['./albumes-menu.component.css']
})
export class AlbumesMenuComponent implements OnInit {

  usuario : Artista = new Artista();

  modoVisualizacion: String = "albumes";
  idAlbum: number;
  nombreAlbum: string;

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

  setIdAlbum(id : number){
    this.idAlbum = id;
  }

  setNombreAlbum(name : string){
    this.nombreAlbum = name;
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

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  constructor(private firebaseStorage:FirebaseStorageService ,private service:ServiceService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  album : Album = new Album();
  idAlbum : String;
  artista : Artista = new Artista();
  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  crearAlbum(){
    this.artista = this.service.getUserLoggedIn();
    if (this.album.nombre != null){
      if(this.album.pathImg == null){
        this.album.pathImg="assets/PlaylistDefecto.jpeg"
      }
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
    this.service.crearAlbum(this.artista.correo,idAlbum).subscribe(data => {
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
      this.album.pathImg = this.URLPublica;
    });
  }

}
