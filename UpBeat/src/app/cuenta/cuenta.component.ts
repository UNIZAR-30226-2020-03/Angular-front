import { Component, OnInit } from '@angular/core';
import { Usuario } from '../MODELO/Usuario';
import { ServiceService } from '../Service/service.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseStorageService } from '../firebase-storage.service'
import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  nombre: string;
  apellidos: string;
  username: string;
  contrasenya: string;
  repContrasenya: string;
  usuario: Usuario = new Usuario();
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private service:ServiceService) { }

  ngOnInit(): void {
    this.getNombreUsuario();
  }

  cerrarSesion(){
    var r = confirm("¿Estás seguro de que quieres cerrar sesión?");
    if (r == true) {
      location.href="http://localhost:4200/" //Aquí habrá que poner la web definitiva
      localStorage.clear();
    } 
  }

  getNombreUsuario(){
    this.usuario = this.service.getUserLoggedIn();
    return this.usuario.nombre;
  }

  actualizarContrasenya(contrasenya,repContrasenya){
    if (contrasenya != null && repContrasenya != null){
      if (contrasenya.length <6 || contrasenya.length >30){
        alert ("La contraseña debe tener entre 6 y 30 caracteres");
      }
      else if(contrasenya != repContrasenya){
        alert("La contraseña repetida no coincide");
      }
      else{
        this.usuario.contrasenya = contrasenya;
        console.log(this.usuario);
        this.service.actualizarUsuario(this.usuario).subscribe(data=>{
          error: error => alert("Se ha producido un error al actualizar datos"); 
          var mensaje = "Contraseña actualizada";
          this.openSnackBar(mensaje, "OK");
        })
      }
    }
  }

  actualizarUsuario(nombre,apellidos,username): void{
    if (nombre != null){
      console.log(nombre);
      this.usuario.nombre = nombre;
    }
    if (apellidos != null){
      console.log(apellidos);
      this.usuario.apellidos = apellidos;
    }

    if (username != null){
      console.log(username);
      if (username.length < 6 || username.length > 30){
        alert("El nombre de usuario debe tener entre 6 y 30 caracteres");
      }
      else {
        this.usuario.username = username;
      } 
    }
    console.log(this.usuario);
    this.service.actualizarUsuario(this.usuario).subscribe(data=>{
      error: error => alert("Se ha producido un error al actualizar datos"); 
      var mensaje = "Datos actualizados correctamente";
      this.openSnackBar(mensaje, "OK");
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(popUp3);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


@Component({
  selector: 'popUp3',
  templateUrl: 'popUp3.html',
})
export class popUp3 {

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  constructor(private firebaseStorage:FirebaseStorageService ,private service:ServiceService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  usuario : Usuario = new Usuario();
  idPlaylist : String;
  pathImg : string;

  public archivoForm = new FormGroup({
    archivo: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.usuario = this.service.getUserLoggedIn();
    console.log("ngoninit");
    console.log(this.usuario);
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
      this.usuario.pathImg = this.URLPublica;
      console.log("pathImgg");
      console.log(this.usuario.pathImg);
      console.log(this.usuario);
    });
  }

  actualizarImagen(){
    if(this.usuario.pathImg == null){
      this.usuario.pathImg = "assets/84025-foto_de_perfil_por_defecto.png";
    }
    this.service.actualizarUsuario(this.usuario).subscribe(data =>{
      error: error => alert("Se ha producido un error");
      var mensaje = "Foto de perfil actualizada";
      this.openSnackBar(mensaje, "OK");
    });

  }

  

}

