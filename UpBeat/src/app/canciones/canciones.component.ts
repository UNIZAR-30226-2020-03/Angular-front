import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {
  
  @Output() cancion = new EventEmitter<string>();
  
  constructor() { }

  play(nombre: string){
    this.cancion.emit(nombre);
  }

  ngOnInit(): void {
  }

}
