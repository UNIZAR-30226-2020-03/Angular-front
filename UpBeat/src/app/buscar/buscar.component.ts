import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  modoVisualizacion = 0;
  tipo: number;
  @Output() cancionActual = new EventEmitter<string>();

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

  actualizarCancionActual(nombre: string){
    this.cancionActual.emit(nombre);
  }

}
