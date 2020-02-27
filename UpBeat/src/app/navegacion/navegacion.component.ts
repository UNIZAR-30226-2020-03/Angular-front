import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {

  reproduciendo: boolean = false;
  volumen=0.5;
  volumenActual=50;
  volumenAnterior=50;
  volumenMin: boolean = false;
  cancionActual: string;
  
  cambiarVolumen(vol) {
    this.volumen = vol;
    if(this.volumen == 0){
      this.volumenMin = true;
    }
    else{
      this.volumenMin = false;
    }
  }

  actualizarCancionActual(nombre: string){
    this.cancionActual=nombre;
  }

  actualizarReproduccion(estado: boolean){
    this.reproduciendo = estado;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

}
