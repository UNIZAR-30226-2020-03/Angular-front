import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {
  
  @Output() cancion = new EventEmitter<string>();
  favoritos=[true,false,true,false,true];
  canciones: string[]=[
  "Amador Rivas - Mandanga Style",
  "Eiffel 65 - Blue (Da Ba Dee)",
  "KAROL G, Nicki Minaj - Tusa",
  "DJ Snake - Taki Taki ft. Selena Gomez, Ozuna, Cardi B",
  "Myke Towers - Diosa"
  ];
  modoVisualizacion: String = "recientes";
  
  constructor(private router:Router) { }

  play(nombre: string){
    this.cancion.emit(nombre);
  }

  ngOnInit(): void {
    if(this.router.url === '/inicio'){
      this.modoComponente(0);
    }
    else if (this.router.url === '/favoritos'){
      this.modoComponente(1);
    }
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
