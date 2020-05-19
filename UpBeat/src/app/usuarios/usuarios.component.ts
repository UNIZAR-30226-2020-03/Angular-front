import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { Usuario } from '../MODELO/Usuario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  esAmigo=[];
  usuarios: Usuario[];
  usuarioActual: Usuario;

  modoVisualizacion: String;

  @Input() cadenaBusqueda: string;

  constructor(private router:Router, private service:ServiceService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usuarioActual = this.service.getUserLoggedIn();
    if(this.router.url === '/buscar'){
      this.modoComponente(0);
    }
    else if (this.router.url === '/amigos'){
      this.modoComponente(1);
    }
  }

  modoComponente(mode){
    if(mode == 0){
      this.modoVisualizacion = "buscar";
      this.listarUsuarios();
    }
    else if (mode == 1){
      this.modoVisualizacion = "amigos";
      this.listarUsuariosSiguiendo();
    }
  }

  listarUsuarios(): void{
    this.service.listarUsuarios().subscribe(data => {
      this.usuarios = data;
      error: error => alert("Se ha producido un error");
      var i = 0;
      this.buscar();
      while(this.usuarios[i]!=null){
        this.esMiAmigo(i,this.usuarioActual.correo,this.usuarios[i].correo);
        i++;
      }
  })
  }

  listarUsuariosSiguiendo(): void{
    this.service.listarUsuariosSiguiendo(this.usuarioActual.correo).subscribe(data => {
      this.usuarios = data;
      error: error => alert("Se ha producido un error");
      var i = 0;
      while(this.usuarios[i]!=null){
        this.esMiAmigo(i,this.usuarioActual.correo,this.usuarios[i].correo);
        i++;
      }
  })
  }

  esMiAmigo(i,miCorreo,suCorreo): void{
    this.service.esAmigo(miCorreo,suCorreo).subscribe(data => {
      error: error => alert("Se ha producido un error");
      if(data == 0){
        this.esAmigo[i] = true;
      }
      else{   //data == 1 OR 2
        this.esAmigo[i] = false;
      }
    })
  }

  seguirUsuario(i,usuario): void{
    if(this.usuarioActual.correo != usuario){
      this.service.seguirUsuario(this.usuarioActual.correo,usuario).subscribe(data => {
        error: error => alert("Se ha producido un error");
        if(data == 0){
          this.esAmigo[i] = true;
          var mensaje = "Ahora eres amigo de "+usuario;
          this.openSnackBar(mensaje, "OK");
        }
      })
    }
    else{   //Se está intentado agregar como amigo a uno mismo
      var mensaje = "No te puedes agregar a ti mismo como amigo";
      this.openSnackBar(mensaje, "OK");
    }
  }

  dejarDeSeguirUsuario(i,usuario): void{
    this.service.dejarDeSeguirUsuario(this.usuarioActual.correo,usuario).subscribe(data => {
      error: error => alert("Se ha producido un error");
      if(data == 0){
        this.esAmigo[i] = false;
        var mensaje = "Ya no eres amigo de "+usuario;
        this.openSnackBar(mensaje, "OK");
      }
  })
  }

  buscar(){
    var cadenaBusqueda = this.cadenaBusqueda.toLowerCase();
    var i = 0;
    while(this.usuarios[i]!=null){
      var usuarioNombre = this.usuarios[i].nombre;
      var usuarioApellidos = this.usuarios[i].apellidos;
      var usuarioComprobacion = usuarioNombre.concat(" ",usuarioApellidos);
      usuarioComprobacion = usuarioComprobacion.toLowerCase();
      if (!usuarioComprobacion.includes(cadenaBusqueda)){
        this.usuarios.splice(i, 1);
      }
      else i++;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
