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

  private subscription: Subscription;
  ngOnInit() {
  }
   constructor() {
     this.ocultarVerificar=true;
     this.Tiempo=5; 
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");  
    this.NuevoJuego();
  }
  NuevoJuego() {
    this.ocultarVerificar=false;
    this.nuevoJuego.primerNumero = Math.round(Math.random() * (this.max  - this.min) + this.min);
    this.nuevoJuego.segundoNumero = Math.round(Math.random() * (this.max  - this.min) + this.min);
    this.nuevoJuego.operador = this.seleccionarOperador();
    this.nuevoJuego.numeroIngresado = 0;

    this.repetidor = setInterval(()=>{ 
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar=true;
        this.Tiempo=6;
        this.nuevoJuego.gano=this.comprobarResultado();
        console.log(this.nuevoJuego.gano);
      }
      }, 900);    
  }
  comprobarResultado(){
    switch(this.nuevoJuego.operador){
      case "+":
        if(this.nuevoJuego.primerNumero + this.nuevoJuego.primerNumero == this.nuevoJuego.numeroIngresado){
          return true;
        }
        break;
        case "-":
          if(this.nuevoJuego.primerNumero - this.nuevoJuego.primerNumero == this.nuevoJuego.numeroIngresado){
            return true;
          }
        break;
        case "*":
          if(this.nuevoJuego.primerNumero * this.nuevoJuego.primerNumero == this.nuevoJuego.numeroIngresado){
            return true;
          }
          break;
          case "/":
            if(Math.round(this.nuevoJuego.primerNumero / this.nuevoJuego.primerNumero) == this.nuevoJuego.numeroIngresado){
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

}
