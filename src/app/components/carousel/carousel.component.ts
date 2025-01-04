import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  standalone:true,
  imports:[CommonModule, NgbCarouselModule]
})
export class CarouselComponent implements OnInit {

  public images : string[] = ["../../../assets/imagenes/tecladogamer.jpg","../../../assets/imagenes/listado1.jpg","../../../assets/imagenes/engranaje.jpg","../../../assets/imagenes/equipo.jpg"]
  public infoImagenes : CarouselInfo[] =[ { titulo:"", descripcion:"Juegos didacticos" },{ titulo:"Listado", descripcion:"Listado de resultados" },{ titulo:"Configuraciones", descripcion:"No disponible" },{ titulo:"Jugadores", descripcion:"Listado de jugadores(No disponible)" } ]
  mostrarCarousel:boolean=true;

  constructor() {
    this.comprobarUsuarioLogueado();
   }
 comprobarUsuarioLogueado(){
    var isLogin = localStorage.getItem("isLoggedIn"); 
    this.mostrarCarousel= isLogin=='true';
  }
  ngOnInit(): void {
  }

}
interface CarouselInfo{
  titulo:string,
  descripcion:string
}
