import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {

  @Output() tiempoCancionRelativa = new EventEmitter();
  @Output() tiempoCancionAbsoluta = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.audio.volume = 0.5;
    setInterval(() => {
      this.tiempoCancionRelativa.emit((this.audio.currentTime/this.audio.duration)*100);
      this.tiempoCancionAbsoluta.emit(Math.trunc(this.audio.currentTime));
    }, 1000);
  }

  audio = new Audio();

  playURL(URL: string){
    this.audio.pause();
    this.audio.src = URL;
    this.audio.load();
    this.audio.play();
    this.audio.addEventListener('ended', () => {
      this.playURL(URL);
    });
  }

  pauseplay(b: boolean){
    if(b){
      this.audio.play();
    }
    else{
      this.audio.pause();
    }
  }

  modificarVolumen(volumen){
    volumen = volumen/100;
    this.audio.volume = volumen;
  }

  modificarTiempo(tiempo){
    tiempo = tiempo/100;
    this.audio.currentTime = this.audio.duration * tiempo;
  }

}
