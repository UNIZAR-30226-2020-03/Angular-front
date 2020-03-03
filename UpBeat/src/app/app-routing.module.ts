import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { PlaylistsMenuComponent } from './playlists-menu/playlists-menu.component';
import { BuscarComponent } from './buscar/buscar.component';
import { CuentaComponent } from './cuenta/cuenta.component';


const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'favoritos', component: FavoritosComponent},
  {path: 'playlists', component: PlaylistsMenuComponent},
  {path: 'buscar', component: BuscarComponent},
  {path: 'cuenta', component: CuentaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
