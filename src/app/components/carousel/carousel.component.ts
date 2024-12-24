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
