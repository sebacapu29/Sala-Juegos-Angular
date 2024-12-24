import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../servicios/jugadores.service';
import { Jugador } from 'src/app/clases/jugador';
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css']
})
export class JugadoresListadoComponent implements OnInit {

  listado:any
  miJugadoresServicio:JugadoresService;
  listadoOriginal:any;
  usuariosEnLocalStorage:any[];

    constructor(serviceJugadores:JugadoresService) {
      this.miJugadoresServicio = serviceJugadores;
      this.TraerTodos();      
    }
    


  ngOnInit() {
  }


  TraerTodos(){
    this.listadoOriginal = this.listado = JSON.parse(localStorage.getItem("usuarios"));      
    
  }
  traerMayorPuntaje(){
    this.listado = this.listadoOriginal.sort((usuarioUno, usuarioDos) => (usuarioUno.puntosTotalesAcum > usuarioDos.puntosTotalesAcum ? -1 : 1));
  }
  traerMenorPuntaje(){
    this.listado = this.listadoOriginal.sort((usuarioUno, usuarioDos) => (usuarioUno.puntosTotalesAcum < usuarioDos.puntosTotalesAcum ? -1 : 1));
  }


}
