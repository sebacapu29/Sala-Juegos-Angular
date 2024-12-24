import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdivinaElNumeroComponent } from '../../games/adivina-el-numero-game/adivina-el-numero/adivina-el-numero.component';
import { ListadoDeResultadosComponent } from '../../components/listado-de-resultados/listado-de-resultados.component';
import { LoginComponent } from '../../components/login/login.component';
import { ErrorComponent } from '../../components/error/error.component';
import { PrincipalComponent } from '../../components/principal/principal.component';
import { AgilidadAritmeticaComponent } from '../../games/agilidad-aritmetica-game/agilidad-aritmetica/agilidad-aritmetica.component';
import { AgilidadMasListadoComponent } from '../../games/agilidad-aritmetica-game/agilidad-mas-listado/agilidad-mas-listado.component';
import { AdivinaMasListadoComponent } from '../../games/adivina-el-numero-game/adivina-mas-listado/adivina-mas-listado.component';
import { ListadoComponent } from'../../components/listado/listado.component'
import { JuegosComponent } from '../../components/juegos/juegos.component';
import { RegistroComponent } from '../../components/registro/registro.component';
import { MenuCardComponent } from '../../components/menu-card/menu-card.component';
import { CabeceraComponent } from '../../components/cabecera/cabecera.component';
import { QuienSoyComponent } from '../../components/quien-soy/quien-soy.component'
import { ListadoDePaisesComponent } from '../../components/listado-de-paises/listado-de-paises.component'
import { MapaDeGoogleComponent } from '../../components/mapa-de-google/mapa-de-google.component'
import { JugadoresListadoComponent } from '../../components/jugadores-listado/jugadores-listado.component';
import { PreguntasComponent } from '../../games/questions-game/preguntas/preguntas.component';
import { PptComponent } from '../../games/paper-rock-scissors-game/ppt/ppt.component';
import { ConfiguracionComponent } from '../../components/configuracion/configuracion.component';
import { AnagramaComponent } from '../../games/anagrama-game/anagrama/anagrama.component';
import { TatetiComponent } from '../../games/tateti-game/tateti/tateti.component';
import { MenuNavComponent } from '../../components/menu-nav/menu-nav.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';


const MiRuteo = [
{path: 'Jugadores' , component: JugadoresListadoComponent},
{path: '' , component: CarouselComponent},
// {path: 'Login' , component: LoginComponent},
{path: 'Mapa' , component: MapaDeGoogleComponent},
{path: 'QuienSoy' , component: QuienSoyComponent},
// {path: 'Registro' , component: RegistroComponent},
// {path: 'Principal' , component: PrincipalComponent},
{path: 'Listado' , component: ListadoComponent},
{path: 'Paises' , component: ListadoDePaisesComponent},
{path:'Configs',component:ConfiguracionComponent},
{path:'Carousel',component:CarouselComponent},

{ path: 'Juegos' ,
component: JuegosComponent ,
children:
     [{path: '' , component: MenuCardComponent},
     {path: 'Adivina' , component: AdivinaElNumeroComponent},
      {path: 'AdivinaMasListado' , component: AdivinaMasListadoComponent},
      {path: 'AgilidadaMasListado' , component: AgilidadMasListadoComponent},
      {path: 'Agilidad' , component: AgilidadAritmeticaComponent},
      {path:'Preguntas',component:PreguntasComponent},
      {path:'PPT',component:PptComponent},
      {path:'Anagrama',component:AnagramaComponent},
      {path:'Tateti',component:TatetiComponent}]
},
// {path: '**' , component: ErrorComponent},
{path: 'error' , component: ErrorComponent}];

@NgModule({
  imports: [
    RouterModule.forChild(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteandoModule { }
