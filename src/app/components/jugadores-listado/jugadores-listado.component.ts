import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../../services/jugadores.service';
import { Jugador } from '../../classes/jugador';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-jugadores-listado',
  templateUrl: './jugadores-listado.component.html',
  styleUrls: ['./jugadores-listado.component.css'],
  providers: [JugadoresService],
  imports:[CommonModule]
})
export class JugadoresListadoComponent implements OnInit {

  listado:any
  miJugadoresServicio:JugadoresService;
  listadoOriginal:any;
  usuariosEnLocalStorage:any[]=[];

    constructor(serviceJugadores:JugadoresService) {
      this.miJugadoresServicio = serviceJugadores;
      this.TraerTodos();      
    }
    


  ngOnInit() {
  }


  TraerTodos(){
    //@ts-ignore
    this.listadoOriginal = this.listado = JSON.parse(localStorage.getItem("usuarios"));      
    
  }
  traerMayorPuntaje(){
    //@ts-ignore
    this.listado = this.listadoOriginal.sort((usuarioUno, usuarioDos) => (usuarioUno.puntosTotalesAcum > usuarioDos.puntosTotalesAcum ? -1 : 1));
  }
  traerMenorPuntaje(){
    //@ts-ignore
    this.listado = this.listadoOriginal.sort((usuarioUno, usuarioDos) => (usuarioUno.puntosTotalesAcum < usuarioDos.puntosTotalesAcum ? -1 : 1));
  }


}
