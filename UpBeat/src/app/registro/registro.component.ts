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

  constructor(private router:Router, private service:ServiceService) {}

  ngOnInit() {
    
  }
  
  registrarUsuario(): void{
    this.service.registrarUsuario(this.usuario).subscribe(data =>{
      this.router.navigate(['/']);
      error: error => alert("Se ha producido un error en el registro");
  })
  }

}