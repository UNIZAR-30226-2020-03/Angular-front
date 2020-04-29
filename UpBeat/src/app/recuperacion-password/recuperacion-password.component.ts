import { Component, OnInit } from '@angular/core';
import { MessageService } from '../Service/message.service';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-recuperacion-password',
  templateUrl: './recuperacion-password.component.html',
  styleUrls: ['./recuperacion-password.component.css']
})
export class RecuperacionPasswordComponent implements OnInit {

  constructor(private router:Router, private service:ServiceService, public _MessageService: MessageService) { }

  ngOnInit(): void {
  }

  recuperarUsuario(form): void{
    this.service.recuperarUsuario(form.email).subscribe(data => {
      this._MessageService.sendMessage(data).subscribe(() => {
        alert('Mensaje enviado correctamente');
      });
      error: error => alert("Se ha producido un error");
  })
  }
}
