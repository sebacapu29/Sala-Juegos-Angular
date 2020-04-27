import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'
import {MatSnackBar} from '@angular/material/snack-bar';

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
  durationInSeconds = 5;

  private subscription: Subscription;
  respuestasParaMostrar: string[];
  listaNumeros: any[];
  usuariosEnLocalStorage: any;
  ngOnInit() {
  }
   constructor(private _snackBar: MatSnackBar) {
     this.ocultarVerificar=true;
     this.Tiempo=5; 
    this.nuevoJuego = new JuegoAgilidad();
    this.respuestasParaMostrar = new Array<string>();    
    var usuarioLocalStorage:any;

    if(localStorage.getItem("usuarioLogueado")!=null){
      this.jugador = usuarioLocalStorage = JSON.parse(localStorage.getItem("usuarioLogueado"));              
    }
    else{
      this.jugador = new Jugador();
    }    
    this.nuevoJuego.jugador = this.jugador.mail;
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
      this.nuevoJuego.juegoTerminado = true;
      this.ocultarVerificar=false;
      var mensaje = this.nuevoJuego.gano ? "Muy bien! Ganaste!" : "Juego perdido vaquero";
      // this.actualizarPuntosUsuario();
      this.nuevoJuego.actualizarDatosJuegos();
      this.openSnackBar(mensaje);
    }
  }
  actualizarPuntosUsuario(){
   
    var usuariosLocalStorage = JSON.parse(localStorage.getItem("usuarios"));
    var indexUsuarioLogueado = this.obtenerIndexUsuarioLogueado();

    if((typeof this.usuariosEnLocalStorage).toString() == 'object'){    
      usuariosLocalStorage = this.jugador; 
    }
    else{
      usuariosLocalStorage[indexUsuarioLogueado] = this.jugador;
    }

    localStorage.removeItem("usuarios");
    localStorage.setItem("usuarios",JSON.stringify(usuariosLocalStorage));
    
  }
 
  actualizarDatosJuegos(){
  
    var juegosEnLocalStorage:any = new Array<any>();
    var usuarioLogueadoEnJuego:any;

    if(localStorage.getItem("juegos")!=null){
      juegosEnLocalStorage = <Array<any>> JSON.parse(localStorage.getItem("juegos"));              

    }
   
    // var juegoActual = this.nuevoJuego;
    // console.log(juegosEnLocalStorage);
    var juegoAGuardar= {"juego":"Agilidad Aritmetica","jugador":this.jugador.nombre,"gano":this.jugador.gano};
    localStorage.removeItem("juegos");
    juegosEnLocalStorage.push(juegoAGuardar);
    console.log(juegoAGuardar);
    localStorage.setItem("juegos",JSON.stringify(juegosEnLocalStorage));
  }
  obtenerIndexUsuarioLogueado():number{
    var usuarioLogueadoEnJuego:any;

    if(localStorage.getItem("usuarioLogueado")!=null){
      usuarioLogueadoEnJuego = JSON.parse(localStorage.getItem("usuarioLogueado"));              
    }
    if(localStorage.getItem("usuarios")!=null){
      this.usuariosEnLocalStorage = <Array<any>> JSON.parse(localStorage.getItem("usuarios"));              
    }
    if(this.usuariosEnLocalStorage!= undefined){      
      for (let index = 0; index <= this.usuariosEnLocalStorage.length; index++) {
        var usuario = this.usuariosEnLocalStorage[index];
        
        
        if(usuario["mail"] ===  usuarioLogueadoEnJuego["mail"]){                    
          return index;     
        }
      }
    }
    return -1;
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
