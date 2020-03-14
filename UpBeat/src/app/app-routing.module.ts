import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { RegistroComponent } from './registro/registro.component';
import { RegistroVipComponent } from './registro-vip/registro-vip.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'registroVip', component: RegistroVipComponent},
  {path: '**', component: NavegacionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
