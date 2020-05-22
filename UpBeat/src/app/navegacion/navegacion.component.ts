import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Usuario } from '../MODELO/Usuario';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit{

  href: string;
  usuario: Usuario = new Usuario();
  artista: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router:Router, private service:ServiceService) {}

  ngOnInit(){
    this.href = "/inicio";
    this.usuario = this.service.getUserLoggedIn();
    setTimeout(() => {
      this.esArtista();
    }, 1000);
    
  }

  actualizarRuta(ruta: string){
    this.href = ruta;
  }

  getNombreUsuario(){
    return this.usuario.nombre;
  }

  esArtista(): void{
    this.service.esArtista(this.usuario.correo).subscribe(data => {
      if(data != null){
        this.artista = true;
      }
      error: error => alert("Se ha producido un error");
  })
  }

}
