import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { Usuario } from '../MODELO/Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  correo: String;
  password: String;

  usuario: Usuario = new Usuario();

  constructor(private router:Router, private service:ServiceService) { }

  ngOnInit(): void {
  }

  loginUsuario(): void{
    this.service.loginUsuario(this.correo,this.password).subscribe(data => {
      this.usuario = JSON.parse(data);
      this.service.setUserLoggedIn(this.usuario);
  })
  }

}
