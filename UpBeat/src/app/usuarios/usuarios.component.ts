import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { Usuario } from '../MODELO/Usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  esAmigo=[];
  usuarios: Usuario[];
  usuarioActual: Usuario;

  constructor(private router:Router, private service:ServiceService) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  actualizarUsuario(num){
    if(this.esAmigo[num]){
      this.esAmigo[num] = false;
    }
    else{
      this.esAmigo[num] = true;
    }
  }

  listarUsuarios(): void{
    this.service.listarUsuarios().subscribe(data => {
      this.usuarios = data;
      error: error => alert("Se ha producido un error");
      var i = 0;
      this.usuarioActual = this.service.getUserLoggedIn();
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

}
