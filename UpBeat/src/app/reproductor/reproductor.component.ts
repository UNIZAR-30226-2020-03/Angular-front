import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {

  constructor() { }

  audio = new Audio();

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
    this.audio.addEventListener('ended', function () {
      this.play();
    }, false);
  }

  playURL(URL: string){
    this.audio.pause();
    this.audio.src = URL;
    this.audio.load();
    this.audio.play();
    this.audio.addEventListener('ended', function () {
      this.play();
    }, false);
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

  ngOnInit(): void {
    this.audio.volume = 0.5;
  }

}
