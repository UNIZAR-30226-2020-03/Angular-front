import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Cancion } from '../MODELO/Cancion';
import { StreamingService } from '../Service/streaming.service';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {
  
  @Output() cancion = new EventEmitter<string>();
  @Output() URL = new EventEmitter<string>();

  favoritos=[true,false,true,false,true];
  modoVisualizacion: String = "recientes";
  
  cancionesBD: Cancion[];

  constructor(private router:Router, private service:StreamingService) { }

  play(i: number){
    this.URL.emit(this.cancionesBD[i].path);
    this.cancion.emit(this.cancionesBD[i].nombre);
  }

  ngOnInit(): void {
    this.listarCanciones();

    if(this.router.url === '/inicio'){
      this.modoComponente(0);
    }
    else if (this.router.url === '/favoritos'){
      this.modoComponente(1);
    }
  }

  listarCanciones(): void{
    this.service.listarCanciones().subscribe(data => {
      this.cancionesBD = data;
      error: error => alert("Se ha producido un error en la identificación");
  })
  }

  actualizarFavorito(num){
    if(this.favoritos[num]){
      this.favoritos[num] = false;
    }
    else{
      this.favoritos[num] = true;
    }
  }

  modoComponente(mode){
    if(mode == 0){
      this.modoVisualizacion = "recientes";
    }
    else if (mode == 1){
      this.modoVisualizacion = "favoritos";
    }
  }

}
