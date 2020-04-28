import { Component, OnInit } from '@angular/core';
import { Usuario } from '../MODELO/Usuario';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-registro-vip',
  templateUrl: './registro-vip.component.html',
  styleUrls: ['./registro-vip.component.css']
})
export class RegistroVipComponent implements OnInit {

  stepForm = 1;
  usuario: Usuario = new Usuario();

  constructor(private router:Router, private service:ServiceService) { }

  ngOnInit(): void {
  }

  registrarUsuario(): void{
    this.service.registrarUsuario(this.usuario).subscribe(data =>{
      this.router.navigate(['/']);
      error: error => alert("Se ha producido un error en el registro");
  })
  }

}
