import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {

  constructor() { }

  audio = new Audio();
  @Output() cancionActual = new EventEmitter<string>();
  @Output() reproduciendoCancion = new EventEmitter<boolean>();
  @Output() volumenAudio = new EventEmitter();

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

  pauseplay(b: boolean){
    if(b){
      this.audio.play();
      this.reproduciendoCancion.emit(true);
    }
    else{
      this.audio.pause();
      this.reproduciendoCancion.emit(false);
    }
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
