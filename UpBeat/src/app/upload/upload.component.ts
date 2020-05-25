import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseStorageService } from '../firebase-storage.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StreamingService } from '../Service/streaming.service';
import { Cancion } from '../MODELO/Cancion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../MODELO/Usuario';
import { ServiceService } from '../Service/service.service';
import { Album } from '../MODELO/Album';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss','../../../node_modules/bulma/css/bulma.min.css']
})
export class UploadComponent implements OnInit {

  nombre: string;
  usuario: Usuario = new Usuario();

  archivo: Cancion = new Cancion();
  albumesBD : Album[];
  idAlbumSeleccionado = "Selecciona el álbum";

  @Output() cancion = new EventEmitter<string>();
  @Output() URL = new EventEmitter<string>();

  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  constructor (
    private firebaseStorage: FirebaseStorageService,
    private router:Router, private serviceStreaming:StreamingService,
    private _snackBar: MatSnackBar,
    private serviceUsuario:ServiceService
  ) {}

  ngOnInit(): void {
    this.usuario = this.serviceUsuario.getUserLoggedIn();
    this.obtenerTodosAlbumes();
  }

  //Evento que se gatilla cuando el input de tipo archivo cambia
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

  //Sube el archivo a Cloud Storage
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
      this.crearArchivo();
    });
  }

  play(){
    this.URL.emit(this.URLPublica);
    var cadena = this.nombreArchivo.split(".mp3");
    this.cancion.emit(cadena[0]);
  }

  crearArchivo(){
    this.archivo.nombre = this.nombre;
    this.archivo.pathMp3 = this.URLPublica;
    this.subirCancionBD(this.archivo);
  }

  subirCancionBD(archivo: Cancion): void{
    this.serviceStreaming.subirCancion(archivo).subscribe(data => {
      error: error => alert("Se ha producido un error");
      this.subirAutorBD(data);
  })
  }

  subirAutorBD(archivo: Cancion): void{
    this.serviceStreaming.subirAutor(this.usuario.correo,archivo.id).subscribe(data => {
      error: error => alert("Se ha producido un error");
      if(this.idAlbumSeleccionado != "Selecciona el álbum"){
        this.anyadirCancionAlbum(archivo.id);
      }
      else{
        var mensaje = "El archivo ha sido subido correctamente";
        this.openSnackBar(mensaje, "OK");
      }
  })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  obtenerTodosAlbumes(){
    this.serviceUsuario.listarTodosAlbums().subscribe(data => {
      this.albumesBD = data;
      error: error => alert("Se ha producido un error");
    })
  }

  anyadirCancionAlbum(idSong){
    this.serviceUsuario.anyadirCancionAlbum(this.idAlbumSeleccionado,idSong).subscribe(data => {
      error: error => alert("Se ha producido un error");
      var mensaje = "El archivo ha sido subido correctamente";
      this.openSnackBar(mensaje, "OK");
    })
  }

}
