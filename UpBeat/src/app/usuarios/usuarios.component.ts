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

  esAmigo=[true,false,true,false,true];
  usuarios: Usuario[];

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
      alert(data);
      error: error => alert("Se ha producido un error");
  })
  }

}
