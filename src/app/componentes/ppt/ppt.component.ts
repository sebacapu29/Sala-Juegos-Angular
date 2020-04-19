import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/clases/jugador';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css'],
  animations: [trigger('animacion',[
    state('estado1',style({        
    })),
    state('estado2',style({
      marginTop:'25%'
    })),
    transition('estado1 <=> estado2',animate('100ms'))
  ])
]
})
export class PptComponent implements OnInit {

  pathContrincate:string;
  pathUsuario:string;
  pathsPPT:string[] = new Array<string>();
  tiempoAnimacion:number;
  seleccionContrincante:string;
  seleccionJugador:string;
  seleccionadoPorJugador:string
  jugador:Jugador;
  estadoAnimJugada:string;
  intervalId: any;
  valorSeleccionado:string;
  imageBackground:string;
  Mensajes:string;

  constructor() {
    this.pathContrincate = "./assets/imagenes/piedra.jpg";
    this.pathUsuario = "./assets/imagenes/piedra2.jpg";
    // this.imageBackground ="";
    this.pathsPPT.push("./assets/imagenes/piedra.jpg");
    this.pathsPPT.push("./assets/imagenes/papel.jpg");
    this.pathsPPT.push("./assets/imagenes/tijera.jpg");
    this.pathsPPT.push("./assets/imagenes/piedra2.jpg");
    this.pathsPPT.push("./assets/imagenes/papel2.jpg");
    this.pathsPPT.push("./assets/imagenes/tijera2.jpg");
    

    this.estadoAnimJugada ="estado1";
    this.valorSeleccionado="piedra";
    this.tiempoAnimacion = 3;
    this.jugador = new Jugador();
    this.jugador.vidas=3;
    this.jugador.puntos=0;
   }

  ngOnInit(): void {
  }
  seleccionJugadaJugador(jugada:string){
    switch(jugada){
      case 'piedra':
        this.seleccionJugador = this.pathsPPT[3];
        this.seleccionadoPorJugador="piedra";
        break;
      case 'papel':
        this.seleccionJugador = this.pathsPPT[4];
        this.seleccionadoPorJugador="papel";
        break;
      case 'tijera':
        this.seleccionJugador = this.pathsPPT[5];
        this.seleccionadoPorJugador="tijera";
        break;
    }
  }
  seleccionJugadaContrincante(){
    var randomNum = Math.round(Math.random() * (2  - 0) + 0);

    switch(randomNum){
      case 0:
        this.pathContrincate = this.pathsPPT[0];
        this.seleccionContrincante="piedra";
        break;
      case 1:
        this.pathContrincate = this.pathsPPT[1];
        this.seleccionContrincante="papel";
        break;
      case 2:
        this.pathContrincate = this.pathsPPT[2];
        this.seleccionContrincante="tijera";
        break;
    }
  }
  comenzar(){


    this.intervalId = setInterval(() => {
      this.tiempoAnimacion -= 1;      
      this.estadoAnimJugada = this.estadoAnimJugada == "estado1" ? "estado2" : "estado1";
      if(this.tiempoAnimacion === 0) {  
        this.estadoAnimJugada = "estado1";
        this.seleccionJugadaContrincante();
        this.pathUsuario = this.seleccionJugador;
        this.tiempoAnimacion=4;
        this.resultadoJugada();
        clearInterval(this.intervalId);
      }         
  }, 1000);
  }
  resultadoJugada(){
    if(this.seleccionadoPorJugador=="piedra" && this.seleccionContrincante=="papel"){
      this.jugador.vidas--;
    } 
    else if(this.seleccionadoPorJugador=="piedra" && this.seleccionContrincante=="tijera"){      
      this.jugador.puntos++;
    } 
    else if(this.seleccionadoPorJugador=="papel" && this.seleccionContrincante=="tijera"){
      this.jugador.vidas--;   
    } 
    else if(this.seleccionadoPorJugador=="papel" && this.seleccionContrincante=="piedra"){
      this.jugador.puntos++;   
    } 
    else if(this.seleccionadoPorJugador=="tijera" && this.seleccionContrincante=="piedra"){
      this.jugador.vidas--;    
    } 
    else if(this.seleccionadoPorJugador=="tijera" && this.seleccionContrincante=="papel"){
      this.jugador.puntos++;    
    } 
  }
}
