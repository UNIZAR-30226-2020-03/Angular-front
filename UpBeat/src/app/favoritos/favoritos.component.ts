import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {

  @Output() cancionActual = new EventEmitter<string>();

  constructor() { }

  actualizarCancionActual(nombre: string){
    this.cancionActual.emit(nombre);
  }

  ngOnInit(): void {
  }

}
