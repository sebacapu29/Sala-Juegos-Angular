import { Component, OnInit } from '@angular/core';
import { Juego } from '../../../classes/juego';
import { CommonModule } from '@angular/common';
import { AgilidadAritmeticaComponent } from '../agilidad-aritmetica/agilidad-aritmetica.component';
import { ListadoDeResultadosComponent } from '../../../components/listado-de-resultados/listado-de-resultados.component';
@Component({
  selector: 'app-agilidad-mas-listado',
  templateUrl: './agilidad-mas-listado.component.html',
  styleUrls: ['./agilidad-mas-listado.component.css'],
  imports:[CommonModule, AgilidadAritmeticaComponent, ListadoDeResultadosComponent ]
})
export class AgilidadMasListadoComponent implements OnInit {
  public listadoParaCompartir: Array<any>;
  constructor() { this.listadoParaCompartir = new Array<any>()}

  ngOnInit() {
  }

  tomarJuegoTerminado(juego: Juego)
  {
    this.listadoParaCompartir.push(juego);
    console.info("en app",this.listadoParaCompartir);
  }
  
}
