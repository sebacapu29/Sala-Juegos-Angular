import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  public isMenuCollapsed = true;
  constructor() {  }
  images = ["../../../assets/imagenes/tecladogamer.jpg","../../../assets/imagenes/listado1.jpg","../../../assets/imagenes/engranaje.jpg","../../../assets/imagenes/equipo.jpg"]
  ngOnInit() {
  }
}
