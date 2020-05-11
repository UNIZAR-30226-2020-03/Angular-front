import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {

  constructor() { }

  audio = new Audio();

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
