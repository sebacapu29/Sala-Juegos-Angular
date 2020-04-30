import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'
import {MatSnackBar} from '@angular/material/snack-bar';

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { Jugador } from 'src/app/clases/jugador';
import { style, trigger, state, transition, animate } from '@angular/animations';
import { LocalStorage } from 'src/app/clases/helpers/local-storage';
import { DateTimeHelper } from 'src/app/clases/helpers/date-time';
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
  durationInSeconds = 5;

  private subscription: Subscription;
  respuestasParaMostrar: string[];
  listaNumeros: any[];
  // usuariosEnLocalStorage: any;
  ngOnInit() {
  }
   constructor(private _snackBar: MatSnackBar) {
     this.ocultarVerificar=true;
     this.Tiempo=5; 
    this.nuevoJuego = new JuegoAgilidad();
    this.respuestasParaMostrar = new Array<string>();    
    
    this.configuracionesIniciarles();
  
    this.NuevoJuego();
  }
  configuracionesIniciarles(){
    var usuarioLocalStorage:any;
    if(localStorage.getItem("usuarioLogueado")!=null){
      usuarioLocalStorage = JSON.parse(localStorage.getItem("usuarioLogueado"));              
    }
    else{
      this.jugador = new Jugador();
    }   
    this.jugador = new Jugador(usuarioLocalStorage.nombre,usuarioLocalStorage.mail,usuarioLocalStorage.clave,usuarioLocalStorage.sexo,"Agilidad Aritmetica"); 
     this.jugador.puntosTotalesAcum = usuarioLocalStorage.puntosTotalesAcum;
     this.jugador.fechaActualizacion = usuarioLocalStorage.fechaActualizacion;
    this.nuevoJuego.jugador = this.jugador.mail;
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
        this.ocultarVerificar= this.nuevoJuego.juegoTerminado ? false: true;
        this.Tiempo=6;
        this.nuevoJuego.gano=this.comprobarResultado();        
      }
      }, 900);    
  }
  openSnackBar(mensaje:string){
    this._snackBar.open(mensaje,"Juego terminado",{duration:4000});
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
  Reiniciar(){
    this.nuevoJuego = new JuegoAgilidad();
    this.jugador.reiniciar();
    this.NuevoJuego();
  }
  evaluarRespuesta(e){

    if(e.target.value === this.nuevoJuego.resultado.toString()){        
      this.mensaje="Correcto!";
      this.jugador.puntos++;
      this.jugador.puntosTotalesAcum++;
    }

    else{
      this.mensaje="Noo! la correcta es:  " + this.nuevoJuego.resultado;
      this.jugador.vidas--;
    }
    this.deshabilitar=true;
    if(this.verificadorJuegoTerminado()){
      this.jugador.fechaActualizacion = DateTimeHelper.getFechaYHora();
      this.nuevoJuego.juegoTerminado = true;
      this.ocultarVerificar=false;
      var mensaje = this.nuevoJuego.gano ? "Muy bien! Ganaste!" : "Juego perdido vaquero";
      this.actualizarPuntosUsuario();
      this.nuevoJuego.actualizarDatosJuegos(); 
           
      this.openSnackBar(mensaje);
    }
  }
  actualizarPuntosUsuario(){
    var indexUser = LocalStorage.obtenerIndexUsuarioLogueado();
    if(indexUser!=-1){
      LocalStorage.actualizarUnUsuario(this.jugador,indexUser);
    }
  }  
  verificadorJuegoTerminado(){
    if(this.jugador.vidas==0){
      this.jugador.gano = this.nuevoJuego.gano=false;   
      return true;
    }
    else if(this.jugador.puntos==3){
      this.jugador.gano = this.nuevoJuego.gano=true;
      return true;
    }
    return false;
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
