import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  tipo: number;
  cadena: String;
}

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  modoVisualizacion = 0;
  tipo: number;
  @Output() cancionActual = new EventEmitter<string>();
  @Output() URL = new EventEmitter<string>();
  cadena: String = "";

  modoItemVisualizacion: String = "inicio";
  idPlaylist: number;
  nombrePlaylist: string;
  idAlbum: number;
  nombreAlbum: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.openDialog();
  }

  cambiarVisualizacion(){
    if(this.modoItemVisualizacion == "inicio"){
      this.modoItemVisualizacion = "canciones";
    }
    else{
      this.modoItemVisualizacion = "inicio";
    }
  }

  cambiarModo(modo){
    if(modo == 1){
      this.modoVisualizacion = 1;
    }
    else if(modo == 0){
      this.modoVisualizacion = 0;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(popUpSearch, {
      data: {tipo: this.tipo, cadena: this.cadena}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result[0] > 0){
        this.cambiarModo(0);
        setTimeout(() => {
          this.cambiarModo(1);
          this.tipo = result[0];
          console.log(result[1]);
          if(result[1] == null){
            this.cadena = "";
          }
          else{
            this.cadena = result[1].toString();
          }
        }, 100);
      }
    });
  }

  actualizarCancionActual(nombre: string){
    this.cancionActual.emit(nombre);
  }

  play(URL: string){
    this.URL.emit(URL);
  }

  setIdPlaylist(id : number){
    this.idPlaylist = id;
    this.idAlbum = null;
  }

  setNombrePlaylist(name : string){
    this.nombrePlaylist = name;
    this.nombreAlbum = null;
  }

  setIdAlbum(id : number){
    this.idAlbum = id;
    this.idPlaylist = null;
  }

  setNombreAlbum(name : string){
    this.nombreAlbum = name;
    this.nombrePlaylist = null;
  }

}


@Component({
  selector: 'popUpSeacrh',
  templateUrl: 'popUpSearch.html',
})
export class popUpSearch {

  datos = [];

  constructor(public dialogRef: MatDialogRef<popUpSearch>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

}
