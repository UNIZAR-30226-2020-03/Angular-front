import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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

  @Input() cadenaBusqueda: string;

  constructor(private router:Router, private service:StreamingService) { }

  play(i: number){
    this.URL.emit(this.cancionesBD[i].path);
    this.cancion.emit(this.cancionesBD[i].nombre);
  }

  ngOnInit(): void {
    if(this.router.url === '/inicio'){
      this.modoComponente(0);
    }
    else if (this.router.url === '/favoritos'){
      this.modoComponente(1);
    }
    else if (this.router.url === '/buscar'){
      this.modoComponente(2);
    }

    this.listarCanciones();
  }

  listarCanciones(): void{
    this.service.listarCanciones().subscribe(data => {
      this.cancionesBD = data;
      if(this.modoVisualizacion == "buscar"){
        this.buscar();
      }
      error: error => alert("Se ha producido un error");
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
    else if (mode == 2){
      this.modoVisualizacion = "buscar";
    }
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

}
