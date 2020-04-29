import { Component, OnInit } from '@angular/core';
import { Artista } from '../MODELO/Artista';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-registro-vip',
  templateUrl: './registro-vip.component.html',
  styleUrls: ['./registro-vip.component.css']
})
export class RegistroVipComponent implements OnInit {

  stepForm = 1;
  artista: Artista = new Artista();

  constructor(private router:Router, private service:ServiceService) { }

  ngOnInit(): void {
  }

  registrarArtista(): void{
    this.service.registrarArtista(this.artista).subscribe(data =>{
      this.router.navigate(['/']);
      error: error => alert("Se ha producido un error en el registro");
  })
  }

}
