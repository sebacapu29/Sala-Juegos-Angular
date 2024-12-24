import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../../services/paises.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-de-paises',
  templateUrl: './listado-de-paises.component.html',
  styleUrls: ['./listado-de-paises.component.css'],
  imports:[CommonModule]
})
export class ListadoDePaisesComponent implements OnInit {
  public listadoDePaises: Array<any>=[];
  miServicioDePaises:PaisesService;
  constructor( servicioPaises:PaisesService) {
    this.miServicioDePaises=servicioPaises;
   }

  ngOnInit() {
    this.miServicioDePaises.listar()
    .then((datos:any)=>{
      console.info("listado de paises",datos);
      this.listadoDePaises=datos;
    });
  }

}
