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
import { PlaylistsMenuComponent, popUp } from './playlists-menu/playlists-menu.component';
import { BuscarComponent } from './buscar/buscar.component';
import { CuentaComponent } from './cuenta/cuenta.component';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { RegistroComponent } from './registro/registro.component';
import { RegistroVipComponent } from './registro-vip/registro-vip.component';
import { RecuperacionPasswordComponent } from './recuperacion-password/recuperacion-password.component';
import { ServiceService }from './Service/service.service'
import { HttpClientModule } from'@angular/common/http';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatStepperModule } from '@angular/material/stepper';
import { UploadComponent } from './upload/upload.component';
import { MessageService } from './Service/message.service';7
import { MatRadioModule } from '@angular/material/radio';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AmigosComponent } from './amigos/amigos.component';
import {MatDialogModule } from '@angular/material/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import { AlbumesComponent } from './albumes/albumes.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AlbumesMenuComponent, popUp2 } from './albumes-menu/albumes-menu.component';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    CuentaComponent,
    LoginComponent,
    RegistroComponent,
    RegistroVipComponent,
    RecuperacionPasswordComponent,
    UploadComponent,
    UsuariosComponent,
    AmigosComponent,
    popUp,
    AlbumesComponent,
    popUp2,
    AlbumesMenuComponent
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
    FormsModule,
    MatInputModule,
    HttpClientModule,
    MatSelectCountryModule,
    MatStepperModule,
    MatRadioModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatDialogModule,
    ScrollingModule,
    MatMenuModule,
    MatFormFieldModule,
    MatTooltipModule
  ],
  providers: [ServiceService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
