
import { Component, OnInit , Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-listado-de-resultados',
  templateUrl: './listado-de-resultados.component.html',
  styleUrls: ['./listado-de-resultados.component.css']
})
export class ListadoDeResultadosComponent implements OnInit {
 
 listado: Array<any>;


  constructor() {
    console.log(localStorage.getItem("juegos"));
    this.listado = JSON.parse(localStorage.getItem("juegos")); 
   }

  ngOnInit() {

  }

}
