import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { Jugador } from 'src/app/clases/jugador';
import { style, trigger, state, transition, animate } from '@angular/animations';
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css'],
  animations: [trigger('animacion',[
    state('estado1',style({        
    })),
    state('estado2',style({
      opacity:'0'
    })),
    transition('estado1 <=> estado2',animate('100ms'))
  ])
]
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
  jugador:Jugador;
  
  private subscription: Subscription;
  respuestasParaMostrar: string[];
  listaNumeros: any[];
  ngOnInit() {
  }
   constructor() {
     this.ocultarVerificar=true;
     this.Tiempo=5; 
    this.nuevoJuego = new JuegoAgilidad();
    this.respuestasParaMostrar = new Array<string>();
    this.jugador = new Jugador();
    this.jugador.vidas=3;
    this.jugador.puntos=0;
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
    this.listaDeNumerosAleatorios();
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
    // console.log(e.target.value);
    // console.log(this.nuevoJuego.resultado.toString());

    if(e.target.value === this.nuevoJuego.resultado.toString()){        
      this.mensaje="Correcto!";
      this.jugador.puntos++;
      this.jugador.puntosTotalesAcum++;
    }
    else{
      this.mensaje="Noo! la correcta es:  " + this.nuevoJuego.resultado;
      this.jugador.vidas--;
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
        case 2:
          return "-";
        case 3:
          return "*"
        case 4:
          return "/"
    }
    return "+";
  }
  verificar()
  {
    this.ocultarVerificar=false;
    clearInterval(this.repetidor);
  }  
  listaDeNumerosAleatorios(){
    const n = 2;
    this.listaNumeros = new Array(n);
    for (let i = 0; i < n; i++) {
        var numero = Math.round(Math.random() * (100  - 1) + 1);
        this.listaNumeros[i] = numero.toString();
    }
    this.listaNumeros[n]=this.nuevoJuego.resultado.toString();

    this.listaNumeros.sort(() => Math.random() > 0.5 ? 1 : -1);
  }
}
