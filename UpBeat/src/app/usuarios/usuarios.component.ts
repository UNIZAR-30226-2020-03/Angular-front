import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  esAmigo=[true,false,true,false,true];
  usuarios: string[]=[
  "Amador Rivas - Mandanga Style",
  "Eiffel 65 - Blue (Da Ba Dee)",
  "KAROL G, Nicki Minaj - Tusa",
  "DJ Snake - Taki Taki ft. Selena Gomez, Ozuna, Cardi B",
  "Myke Towers - Diosa"
  ];

  constructor() { }

  ngOnInit(): void {
  }

  actualizarUsuario(num){
    if(this.esAmigo[num]){
      this.esAmigo[num] = false;
    }
    else{
      this.esAmigo[num] = true;
    }
  }

}
