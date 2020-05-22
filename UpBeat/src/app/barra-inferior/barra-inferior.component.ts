import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-barra-inferior',
  templateUrl: './barra-inferior.component.html',
  styleUrls: ['./barra-inferior.component.css']
})
export class BarraInferiorComponent implements OnInit {

  @Output() volumenBarra = new EventEmitter();
  @Output() cancionEnReproduccion = new EventEmitter();
  @Output() tiempoCancion = new EventEmitter();

  constructor() { }

  reproduciendo: boolean = false;
  volumen=50;
  volumenActual=50;
  volumenAnterior=50;
  volumenMin: boolean = false;
  cancionActual: string = "No hay nada reproduciendo";
  plus: number = 0;
  tiempoRelativoSong = 0;
  tiempoActual = 0;

  modificarVolumen(vol){
    this.volumen = vol;
    if(this.volumen == 0){
      this.volumenMin = true;
    }
    else{
      this.volumenMin = false;
    }
    this.volumenBarra.emit(vol);
  }

  modificarTiempo(){
    this.tiempoCancion.emit(this.tiempoRelativoSong);
  }

  actualizarTiempoBarra(t){
    this.tiempoRelativoSong = t;
  }

  actualizarTiempoCancionAbs(t){
    this.tiempoActual = t;
  }

  pause(){
    this.cancionEnReproduccion.emit(false);
    this.reproduciendo = false;
  }

  reanudar(){
    this.cancionEnReproduccion.emit(true);
    this.reproduciendo = true;
  }

  actualizarCancionActual(nombre: string){
    this.cancionActual=nombre;
    this.reproduciendo = true;
  }

  ngOnInit(): void {
  }

  enter(n){
    this.plus = n;
  }

}
