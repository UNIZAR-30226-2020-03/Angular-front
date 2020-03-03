import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  @Output() cancionActual = new EventEmitter<string>();

  constructor() { }

  actualizarCancionActual(nombre: string){
    this.cancionActual.emit(nombre);
  }

  ngOnInit(): void {
  }

}
