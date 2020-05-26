import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { Usuario } from '../MODELO/Usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit{
  
  stepForm = 1;
  usuario: Usuario = new Usuario();
  repContrasenya : string;

  constructor(private router:Router, private service:ServiceService) {}

  ngOnInit() {
    
  }
  
  registrarUsuario(): void{
    this.service.registrarUsuario(this.usuario).subscribe(data =>{
      this.router.navigate(['/']);
      error: error => alert("Se ha producido un error en el registro");
  })
  }

  comprobarContrasenya(): void{
    if(this.usuario.contrasenya != null ){
      if((this.usuario.contrasenya).length <6 || (this.usuario.contrasenya).length > 30){
        alert("La contraseña debe tener entre 6 y 30 caracteres");
      }
      else if (this.usuario.contrasenya != this.repContrasenya){
        alert("Las contraseñas introducidas no coinciden");
      }
    }
    else{
      alert("La contraseña no puede ser vacía");
    }
    if(this.usuario.username != null){
      if((this.usuario.contrasenya).length <6 || (this.usuario.contrasenya).length > 30){
        alert("El nombre de usuario debe tener entre 6 y 30 caracteres");
      }
      else{
        this.stepForm = 3;
      }
    }
    else{
      alert("El usuario no pude ser vacío");
    }

  }

  
  obtenerCliente(){
    this.service.existeUsuario(this.usuario.correo).subscribe(
      res => {alert('Este correo ya está registrado');},
      err => this.stepForm=2
      )
  }

}