import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
  
  constructor() { }

  play(nombre: string){
    this.cancion.emit(nombre);
  }

  ngOnInit(): void {
  }

  actualizarFavorito(num){
    if(this.favoritos[num]){
      this.favoritos[num] = false;
    }
    else{
      this.favoritos[num] = true;
    }
  }

}
