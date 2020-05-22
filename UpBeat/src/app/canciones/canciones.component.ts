import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cancion } from '../MODELO/Cancion';
import { StreamingService } from '../Service/streaming.service';
import { ServiceService } from '../Service/service.service';
import { Usuario } from '../MODELO/Usuario';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {
  
  @Output() cancion = new EventEmitter<string>();
  @Output() URL = new EventEmitter<string>();

  favoritos: boolean[] = [false];
  modoVisualizacion: String = "recientes";
  
  cancionesBD: Cancion[];

  @Input() cadenaBusqueda: string;

  usuarioActual: Usuario;

  constructor(private router:Router, private service:StreamingService, private serviceUser:ServiceService, private _snackBar: MatSnackBar) { }

  play(i: number){
    this.reproducirCanconId(this.cancionesBD[i].id)
    this.URL.emit(this.cancionesBD[i].pathMp3);
    this.cancion.emit(this.cancionesBD[i].nombre);
  }

  ngOnInit(): void {
    this.usuarioActual = this.serviceUser.getUserLoggedIn();
    if(this.router.url === '/inicio'){
      this.modoComponente(0);
    }
    else if (this.router.url === '/favoritos'){
      this.modoComponente(1);
    }
    else if (this.router.url === '/buscar'){
      this.modoComponente(2);
    }
  }

  modoComponente(mode){
    if(mode == 0){
      this.modoVisualizacion = "recientes";
      this.listarCanciones();
    }
    else if (mode == 1){
      this.modoVisualizacion = "favoritos";
      this.listarCancionesFavoritas();
    }
    else if (mode == 2){
      this.modoVisualizacion = "buscar";
      this.listarCanciones();
    }
  }

  reproducirCanconId(id: number): void{
    this.service.reproducirCancionId(id).subscribe(data => {
      error: error => alert("Se ha producido un error");
    })
  }

  listarCanciones(): void{
    this.service.listarCanciones().subscribe(data => {
      this.cancionesBD = data;
      if(this.modoVisualizacion == "buscar"){
        this.buscar();
      }
      error: error => alert("Se ha producido un error");
      var i = 0;
      while(this.cancionesBD[i]!=null){
        this.esFavorito(i,this.usuarioActual.correo,this.cancionesBD[i].id);
        i++;
      }
    })
  }

  listarCancionesFavoritas(): void{
    this.service.listarFavoritos(this.usuarioActual.correo).subscribe(data => {
      this.cancionesBD = data;
      error: error => alert("Se ha producido un error");
      var i = 0;
      while(this.cancionesBD[i]!=null){
        this.favoritos[i] = true;
        i++;
      }
  })
  }

  esFavorito(i,miCorreo,id){
    this.service.esFavorito(miCorreo,id).subscribe(data => {
      error: error => alert("Se ha producido un error");
      if(data == 0){
        this.favoritos[i] = true;
      }
      else{   //data == 1 OR 2
        this.favoritos[i] = false;
      }
    })
  }

  marcarFavorito(i,id){
    this.service.marcarFavorito(this.usuarioActual.correo,id).subscribe(data => {
      error: error => alert("Se ha producido un error");
      if(data == 0){
        this.favoritos[i] = true;
        var mensaje = "Ahora '"+this.cancionesBD[i].nombre+"' está en tus favoritos";
        this.openSnackBar(mensaje, "OK");
      }
    })
  }

  desmarcarFavorito(i,id){
    this.service.desmarcarFavorito(this.usuarioActual.correo,id).subscribe(data => {
      error: error => alert("Se ha producido un error");
      if(data == 0){
        this.favoritos[i] = false;
        var mensaje = "'"+this.cancionesBD[i].nombre+"' ya no está en tus favoritos";
        this.openSnackBar(mensaje, "OK");
      }
    })
  }

  buscar(){
    var cadenaBusqueda = this.cadenaBusqueda.toLowerCase();
    var i = 0;
    while(this.cancionesBD[i]!=null){
      var cancionTitulo = this.cancionesBD[i].nombre;
      var cancionComprobacion = cancionTitulo.toLowerCase();
      if (!cancionComprobacion.includes(cadenaBusqueda)){
        this.cancionesBD.splice(i, 1);
      }
      else i++;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
