import { Component, OnInit } from '@angular/core';
import { JuegoServiceService } from '../../services/juego-service.service';
import { CommonModule } from '@angular/common';
import { ListadoDeResultadosComponent } from '../listado-de-resultados/listado-de-resultados.component';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  providers: [JuegoServiceService],
  imports:[CommonModule, ListadoDeResultadosComponent]
})
export class ListadoComponent implements OnInit {
  public listadoParaCompartir: Array<any>= new Array<any>;
   miServicioJuego:JuegoServiceService

  constructor(servicioJuego:JuegoServiceService) {
    this.miServicioJuego = servicioJuego;
    
  }
  
  ngOnInit() {
    
  }

  llamaService(){
    console.log("llamaService");
    this.listadoParaCompartir= this.miServicioJuego.listar();
  }

  llamaServicePromesa(){
    console.log("llamaServicePromesa");
    this.miServicioJuego.listarPromesa().then((listado) => {
        this.listadoParaCompartir = listado;
    });
  }
}
