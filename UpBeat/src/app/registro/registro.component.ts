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
  Registro(usuario:Usuario){
    this.service.registrarUsuario(usuario);
  }

}