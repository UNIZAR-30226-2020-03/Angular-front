import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
//import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-canciones',
  templateUrl: './canciones.component.html',
  styleUrls: ['./canciones.component.css']
})
export class CancionesComponent implements OnInit {

  audio = new Audio();
  @Output() cancionActual = new EventEmitter<string>();
  @Output() reproduciendoCancion = new EventEmitter<boolean>();
  @Output() volumenAudio = new EventEmitter();

  constructor() { }

  play(nombre: string){
    if(nombre == 'Amador Rivas - Mandanga Style'){
      this.audio.pause();
      this.audio.src = "../../assets/audio/mandangaStyle.mp3";
      this.audio.load();
      this.audio.play();
    }
    else if(nombre == 'Eiffel 65 - Blue (Da Ba Dee)'){
      this.audio.pause();
      this.audio.src = "../../assets/audio/bluedabadee.mp3";
      this.audio.load();
      this.audio.play();
    }
    else if(nombre == 'KAROL G, Nicki Minaj - Tusa'){
      this.audio.pause();
      this.audio.src = "../../assets/audio/tusa.mp3";
      this.audio.load();
      this.audio.play();
    }
    else if(nombre == 'DJ Snake - Taki Taki ft. Selena Gomez, Ozuna, Cardi B'){
      this.audio.pause();
      this.audio.src = "../../assets/audio/takitaki.mp3";
      this.audio.load();
      this.audio.play();
    }
    else if(nombre == 'Myke Towers - Diosa'){
      this.audio.pause();
      this.audio.src = "../../assets/audio/diosa.mp3";
      this.audio.load();
      this.audio.play();
    }
    this.cancionActual.emit(nombre);
    this.reproduciendoCancion.emit(true);
  }

  pause(){
    this.audio.pause();
    this.reproduciendoCancion.emit(false);
  }

  reanudar(){
    this.audio.play();
    this.reproduciendoCancion.emit(true);
  }

  modificarVolumen(volumen){
    volumen = volumen/100;
    this.audio.volume = volumen;
    this.volumenAudio.emit(volumen);
  }

  ngOnInit(): void {
    this.audio.volume = 0.5;
  }

}
