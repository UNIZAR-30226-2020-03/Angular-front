import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { Usuario } from '../MODELO/Usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  
  constructor(private router:Router, private service:ServiceService) {}


  ngOnInit() {
    
  }
  usuario:Usuario = new Usuario();
  Registro(nombre:String, apellidos:String, email:String, user:String, password:String, pais:String){
    this.usuario.nombre = nombre;
    this.usuario.apellidos = apellidos;
    this.usuario.user = user;
    this.usuario.email = email;
    this.usuario.password = password;
    this.usuario.pais = pais;

    this.service.registrarUsuario(this.usuario)
    .subscribe(data=>{
      alert("Se agrego con Exito..");
    });
  }

}
