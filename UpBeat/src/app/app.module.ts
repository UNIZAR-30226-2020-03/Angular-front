import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CancionesComponent } from './canciones/canciones.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { ReproductorComponent } from './reproductor/reproductor.component';
import { CancionActualComponent } from './cancion-actual/cancion-actual.component';

import { FormsModule } from '@angular/forms';
import { InicioComponent } from './inicio/inicio.component';
import { BarraInferiorComponent } from './barra-inferior/barra-inferior.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { PlaylistsMenuComponent } from './playlists-menu/playlists-menu.component';
import { BuscarComponent } from './buscar/buscar.component';
import { CuentaComponent } from './cuenta/cuenta.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    CancionesComponent,
    PlaylistsComponent,
    ReproductorComponent,
    CancionActualComponent,
    InicioComponent,
    BarraInferiorComponent,
    FavoritosComponent,
    PlaylistsMenuComponent,
    BuscarComponent,
    CuentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatButtonToggleModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }