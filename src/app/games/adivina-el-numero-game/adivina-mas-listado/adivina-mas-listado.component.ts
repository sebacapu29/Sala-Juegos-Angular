import { Component, OnInit } from '@angular/core';
import { Juego } from '../../../classes/juego';
import { CommonModule } from '@angular/common';
import { AdivinaElNumeroComponent } from '../adivina-el-numero/adivina-el-numero.component';
import { ListadoDeResultadosComponent } from '../../../components/listado-de-resultados/listado-de-resultados.component';
@Component({
  selector: 'app-adivina-mas-listado',
  templateUrl: './adivina-mas-listado.component.html',
  styleUrls: ['./adivina-mas-listado.component.css'],
  imports:[CommonModule, AdivinaElNumeroComponent, ListadoDeResultadosComponent]
})
export class AdivinaMasListadoComponent implements OnInit {
  public listadoParaCompartir: Array<any>;
  constructor() { this.listadoParaCompartir = new Array<any>()}


  ngOnInit() {
  }
   tomarJuegoTerminado(juego: any)
  {
    this.listadoParaCompartir.push(juego);
   // console.info("en app",this.listadoParaCompartir);
  }
  
}
