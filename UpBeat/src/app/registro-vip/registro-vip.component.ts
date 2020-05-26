import { Component, OnInit } from '@angular/core';
import { Artista } from '../MODELO/Artista';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-registro-vip',
  templateUrl: './registro-vip.component.html',
  styleUrls: ['./registro-vip.component.css']
})
export class RegistroVipComponent implements OnInit {

  stepForm = 1;
  artista: Artista = new Artista();
  repContrasenya : string;

  constructor(private router:Router, private service:ServiceService) { }

  ngOnInit(): void {
  }

  registrarArtista(): void{
    this.service.registrarArtista(this.artista).subscribe(data =>{
      this.router.navigate(['/']);
      error: error => alert("Se ha producido un error en el registro");
  })
  }

  comprobarContrasenya(): void{
    if(this.artista.contrasenya != null && this.repContrasenya ){
      if((this.artista.contrasenya).length <6 || (this.artista.contrasenya).length > 30){
        alert("La contraseña debe tener entre 6 y 30 caracteres");
      }
      else if (this.artista.contrasenya != this.repContrasenya){
        alert("Las contraseñas introducidas no coinciden");
      }
      else{
        this.stepForm=4;
      }
    }
  }

  obtenerCliente(){
    this.service.existeUsuario(this.artista.correo).subscribe(
      res => {alert('Este correo ya está registrado');},
      err => this.stepForm=2
      )
  }

}
