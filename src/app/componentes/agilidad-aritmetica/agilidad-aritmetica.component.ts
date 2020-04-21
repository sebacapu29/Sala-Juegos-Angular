import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() 
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
  min:number = 1;
  max:number= 50;
  operadores:number=4;
  mensaje:string;
  deshabilitar:boolean;

  private subscription: Subscription;
  respuestasParaMostrar: string[];
  ngOnInit() {
  }
   constructor() {
     this.ocultarVerificar=true;
     this.Tiempo=5; 
    this.nuevoJuego = new JuegoAgilidad();
    this.respuestasParaMostrar = new Array<string>();
    this.NuevoJuego();
  }
  NuevoJuego() {
    this.ocultarVerificar=false;
    this.deshabilitar=false;
    this.nuevoJuego.primerNumero = Math.round(Math.random() * (this.max  - this.min) + this.min);
    this.nuevoJuego.segundoNumero = Math.round(Math.random() * (this.max  - this.min) + this.min);
    this.nuevoJuego.operador = this.seleccionarOperador();
    this.nuevoJuego.numeroIngresado = 0;
    this.realizarOperacion();
    this.randomSeleccion(this.nuevoJuego.resultado.toString());
    this.repetidor = setInterval(()=>{ 
      this.Tiempo--;
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.mensaje="";
        this.deshabilitar=true;
        this.ocultarVerificar=true;
        this.Tiempo=6;
        this.nuevoJuego.gano=this.comprobarResultado();
        // console.log(this.nuevoJuego.gano);
      }
      }, 900);    
  }
  realizarOperacion(){
    switch(this.nuevoJuego.operador){
      case "+":
        this.nuevoJuego.resultado = this.nuevoJuego.primerNumero + this.nuevoJuego.segundoNumero;
        break;
        case "-":
          this.nuevoJuego.resultado = this.nuevoJuego.primerNumero - this.nuevoJuego.segundoNumero;
        break;
        case "*":
          this.nuevoJuego.resultado = this.nuevoJuego.primerNumero * this.nuevoJuego.segundoNumero;      
          break;
          case "/":
            this.nuevoJuego.resultado = Math.round(this.nuevoJuego.primerNumero / this.nuevoJuego.segundoNumero);
            break;
    }
  }
  evaluarRespuesta(e){
    console.log(e.target.value);
    console.log(this.nuevoJuego.resultado.toString());

    if(e.target.value === this.nuevoJuego.resultado.toString()){        
      this.mensaje="Correcto!";
      // this.clearGame();
    }
    else{
      this.mensaje="Noo! la correcta es:  " + this.nuevoJuego.resultado;
    }
    // this.verificadorJuegoTerminado();
  }
  comprobarResultado(){
    switch(this.nuevoJuego.operador){
      case "+":
        if( this.nuevoJuego.resultado == this.nuevoJuego.numeroIngresado){
          return true;
        }
        break;
        case "-":
          if(this.nuevoJuego.resultado == this.nuevoJuego.numeroIngresado){
            return true;
          }
        break;
        case "*":
          if(this.nuevoJuego.resultado == this.nuevoJuego.numeroIngresado){
            return true;
          }
          break;
          case "/":
            if( this.nuevoJuego.resultado == this.nuevoJuego.numeroIngresado){
              return true;
            }
            break;
    }
  }
  seleccionarOperador(){
    var operadorRandom = Math.round(Math.random() * (this.operadores  - 1) + 1);
    switch(operadorRandom){
      case 1:
        return "+";
        break;
        case 2:
          return "-";
        break;
        case 3:
          return "*"
        break;
        case 4:
          return "/"
        break;
    }
    return "+";
  }
  verificar()
  {
    this.ocultarVerificar=false;
    clearInterval(this.repetidor);
  }  
  randomSeleccion(respuestaCorrecta:string){
    var randomAnswerPosition = Math.round(Math.random() * (3  - 1) + 1);
    var randomAnswer2 = Math.round(Math.random() * (100  - 1) + 1);
    var randomAnswer3 = Math.round(Math.random() * (100  - 1) + 1);
    this.respuestasParaMostrar = new Array<string>();
    switch(randomAnswerPosition){
      case 1:
        this.respuestasParaMostrar.push(respuestaCorrecta);    
        this.respuestasParaMostrar.push(randomAnswer2.toString());
        this.respuestasParaMostrar.push(randomAnswer3.toString());
        break;
      case 2:
        this.respuestasParaMostrar.push(randomAnswer2.toString());    
        this.respuestasParaMostrar.push(respuestaCorrecta);
        this.respuestasParaMostrar.push(randomAnswer3.toString());
          break;
      case 3:
        this.respuestasParaMostrar.push(randomAnswer2.toString());    
        this.respuestasParaMostrar.push(randomAnswer3.toString());
        this.respuestasParaMostrar.push(respuestaCorrecta);
         break;
    }
  }
}
