import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Usuario } from '../MODELO/Usuario';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';
import { Cancion } from '../MODELO/Cancion';
import { StreamingService } from '../Service/streaming.service';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Playlist } from '../MODELO/Playlist';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  usuario : Usuario = new Usuario();
  allPlaylistsBD: Playlist[];
  
  constructor(private router:Router, private service:ServiceService) { }

  ngOnInit(): void {
    this.obtenerTodasPlaylists();
  }

  obtenerTodasPlaylists(){

    this.service.listarTodasPlaylists().subscribe(data => {
      this.allPlaylistsBD = data;
      error: error => alert("Se ha producido un error");
    })
  }

}
