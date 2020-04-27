import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Usuario } from '../MODELO/Usuario';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  usuario: Usuario = new Usuario();
  constructor(private breakpointObserver: BreakpointObserver, private router:Router, private service:ServiceService) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    var r = confirm("¿Estás seguro de que quieres cerrar sesión?");
    if (r == true) {
      location.href="http://localhost:4200/" //Aquí habrá que poner la web definitiva
    } 
  }

  getNombreUsuario(){
    this.usuario = this.service.getUserLoggedIn();
    return this.usuario.nombre;
  }
}
