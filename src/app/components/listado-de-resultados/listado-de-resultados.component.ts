
import { Component, OnInit , Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
 
 listado: Array<any>;
 listadoOriginal: Array<any>;

  constructor() {
    this.listadoOriginal =  this.listado = JSON.parse(localStorage.getItem("juegos")); 
   }

  ngOnInit() {

  }
  traerTodos(){
    this.listado = this.listadoOriginal;
  }
  traerGanadores(){
    this.listado = this.listadoOriginal.filter(function(juego){
      
      return juego.gano == true;
    });
  }
  traerPerdedores(){
    this.listado = this.listadoOriginal.filter(function(juego){      
      return juego.gano == false;
    });
  }

}
