import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  modoVisualizacion = 0;
  tipo: number;

  constructor() { }

  ngOnInit(): void {
  }

  cambiarModo(modo){
    if(modo == 1){
      this.modoVisualizacion = 1;
    }
    else if(modo == 0){
      this.modoVisualizacion = 0;
    }
  }

}
