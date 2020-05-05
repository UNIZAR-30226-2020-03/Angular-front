import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, isEmpty } from 'rxjs/operators';
import { Usuario } from '../MODELO/Usuario';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';

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
  constructor(private breakpointObserver: BreakpointObserver, private router:Router, private service:ServiceService) { }

  ngOnInit(): void {
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
    })
  }
}
