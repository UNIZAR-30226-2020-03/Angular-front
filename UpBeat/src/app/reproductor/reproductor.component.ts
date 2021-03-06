import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StreamingService } from '../Service/streaming.service';
import { ServiceService } from '../Service/service.service';
import { Usuario } from '../MODELO/Usuario';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css']
})
export class ReproductorComponent implements OnInit {

  @Output() tiempoCancionRelativa = new EventEmitter();
  @Output() tiempoCancionAbsoluta = new EventEmitter();
  @Output() cancionActual = new EventEmitter();

  usuario: Usuario = new Usuario();
  audio = new Audio();
  reproduciendo: boolean = false;

  constructor(public service : StreamingService, public serviceUser: ServiceService) { }

  ngOnInit(): void {
    this.usuario = this.serviceUser.getUserLoggedIn();
    this.audio.volume = 0.5;
    setInterval(() => {
      this.tiempoCancionRelativa.emit((this.audio.currentTime/this.audio.duration)*100);
      this.tiempoCancionAbsoluta.emit(Math.trunc(this.audio.currentTime));
    }, 1000);
  }
  
  playURL(URL: string){
    console.log("play");
    this.audio.pause();
    this.audio.src = URL;
    this.audio.load();
    this.audio.play();
    if(!this.reproduciendo){
      this.reproduciendo = true;
      this.nextAutomatico();
    }
  }

  pauseplay(b: boolean){
    if(b){
      this.audio.play();
    }
    else{
      this.audio.pause();
    }
  }

  nextAutomatico(){
    this.audio.addEventListener('ended', () => {
      this.service.next(this.usuario.correo).subscribe(data =>{
        var aux = data["cancion"];
        var src = aux["pathMp3"];
        var nombre = aux["nombre"].toString();
        this.cancionActual.emit(nombre);
        this.playURL(src);
      })
    });
  }

  nextUnico(){
    this.service.next(this.usuario.correo).subscribe(data =>{
      var aux = data["cancion"];
      var src = aux["pathMp3"];
      var nombre = aux["nombre"].toString();
      this.cancionActual.emit(nombre);
      this.playURL(src);
    })
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
