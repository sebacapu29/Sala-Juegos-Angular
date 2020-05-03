import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  images = ["../../../assets/imagenes/tecladogamer.jpg","../../../assets/imagenes/listado1.jpg","../../../assets/imagenes/engranaje.jpg","../../../assets/imagenes/equipo.jpg"]
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
