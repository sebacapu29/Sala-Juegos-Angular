import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdivinaElNumeroComponent } from './games/adivina-el-numero-game/adivina-el-numero/adivina-el-numero.component';
import { ListadoDeResultadosComponent } from './components/listado-de-resultados/listado-de-resultados.component';
import { LoginComponent } from './components/login/login.component';
 import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'; 

import { RouterModule, Routes } from '@angular/router';

import { MiHttpService } from './services/mi-http/mi-http.service'; 
import { PaisesService } from './services/paises.service'; 

import { JugadoresService } from './services/jugadores.service'; 
import{ ArchivosJugadoresService} from './services/archivos-jugadores.service'; 
import { ErrorComponent } from './components/error/error.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { AgilidadAritmeticaComponent } from './games/agilidad-aritmetica-game/agilidad-aritmetica/agilidad-aritmetica.component';
import { AgilidadMasListadoComponent } from '././games/agilidad-aritmetica-game/agilidad-mas-listado/agilidad-mas-listado.component';
import { AdivinaMasListadoComponent } from './games/adivina-el-numero-game/adivina-mas-listado/adivina-mas-listado.component';
import { RuteandoModule } from './modules/ruteando/ruteando.module';
import { ListadoComponent } from './components/listado/listado.component';
import { FlexLayoutModule} from '@angular/flex-layout'

import { JugadoresListadoComponent } from './components/jugadores-listado/jugadores-listado.component';

import { JuegoServiceService } from './services/juego-service.service';
import { JuegosComponent } from './components/juegos/juegos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { MenuCardComponent } from './components/menu-card/menu-card.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { ListadoDePaisesComponent } from './components/listado-de-paises/listado-de-paises.component';
import { MapaDeGoogleComponent } from './components/mapa-de-google/mapa-de-google.component'
import { AgmCoreModule } from '@agm/core';
import { SexoPipe } from './pipes/sexo.pipe';
import { PreguntasComponent } from './games/questions-game/preguntas/preguntas.component';
import { ModalPreguntasComponent } from './components/modal-preguntas/modal-preguntas.component';
import { PptComponent } from './games/paper-rock-scissors-game/ppt/ppt.component';
import { MaterialModule } from './modules/material-Modules/material.module';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { AnagramaComponent } from './games/anagrama-game/anagrama/anagrama.component';
import { TatetiComponent } from './games/tateti-game/tateti/tateti.component';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ToastService } from './services/toast.service';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    AdivinaElNumeroComponent,
    ListadoDeResultadosComponent,
    ErrorComponent,
    PrincipalComponent,
    LoginComponent,
    AgilidadAritmeticaComponent,
    AdivinaMasListadoComponent,
    AgilidadMasListadoComponent,
    ListadoComponent,
    JuegosComponent,
    RegistroComponent,
    MenuCardComponent,
    CabeceraComponent,
    QuienSoyComponent,
    ListadoDePaisesComponent,
    MapaDeGoogleComponent,
    JugadoresListadoComponent,
    SexoPipe,
    PreguntasComponent,
    ModalPreguntasComponent,
    PptComponent,
    ConfiguracionComponent,
    AnagramaComponent,
    TatetiComponent,
    MenuNavComponent,
    CarouselComponent,
    ToastComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RuteandoModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6f8x4IjRlesQ3oETc6BXYQHVRTOlY3Ys'
    }),
    NgbModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    NoopAnimationsModule
  ],
  providers: [ JuegoServiceService, MiHttpService,PaisesService,ArchivosJugadoresService,JugadoresService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
