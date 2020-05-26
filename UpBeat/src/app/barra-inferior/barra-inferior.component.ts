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
  @Output() siguienteCancion = new EventEmitter();

  constructor() { }

  reproduciendo: boolean = false;
  volumen=50;
  volumenActual=50;
  volumenAnterior=50;
  volumenMin: boolean = false;
  cancionActual: string = "No hay nada reproduciendo";
  plus: number = 0;
  tiempoRelativoSong = 0;
  tiempoActual: string = "0:00";

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
    if(t > 59){
      var minuto = Math.trunc(t/60);
      var segundo = t%60;
      if(segundo < 10){
        this.tiempoActual = minuto + ":0" + segundo;
      }
      else{
        this.tiempoActual = minuto + ":" + segundo;
      }
    }
    else{
      if(t < 10){
        this.tiempoActual = "0:0" + t;
      }
      else{
        this.tiempoActual = "0:" + t;
      }
    }
  }

  pause(){
    this.cancionEnReproduccion.emit(false);
    this.reproduciendo = false;
  }

  reanudar(){
    this.cancionEnReproduccion.emit(true);
    this.reproduciendo = true;
  }

  next(){
    this.siguienteCancion.emit();
  }

  actualizarCancionActual(nombre : string){
    this.cancionActual=nombre;
    this.reproduciendo = true;
  }

  ngOnInit(): void {
  }

  enter(n){
    this.plus = n;
  }

}
