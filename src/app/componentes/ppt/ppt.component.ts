import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/clases/jugador';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { JuegoPiedraPapelTijera } from 'src/app/clases/juego-piedra-papel-tijera';
import { LocalStorage } from 'src/app/clases/helpers/local-storage';
import { DateTimeHelper } from 'src/app/clases/helpers/date-time';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css'],
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
  juegoTerminado:boolean;
  seleccionoOpcion:boolean=false;
  audio:any;
  nuevoJuego:JuegoPiedraPapelTijera;
  esEmpate:boolean;
  deshabilitar:boolean;

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
    this.tiempoAnimacion = 6;
    this.jugador = new Jugador();
    this.audio = new Audio();  
    // this.jugador.vidas=3;
    // this.jugador.puntos=0;
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    var usuarioLocalStorage:any;

    if(localStorage.getItem("usuarioLogueado")!=null){
      usuarioLocalStorage = JSON.parse(localStorage.getItem("usuarioLogueado"));              
    }    
    this.jugador = new Jugador(usuarioLocalStorage.nombre,usuarioLocalStorage.mail,usuarioLocalStorage.clave,usuarioLocalStorage.sexo,"Poderoso Conocimiento"); 
    this.nuevoJuego.jugador = this.jugador.mail;
   
    this.jugador.puntosTotalesAcum = usuarioLocalStorage.puntosTotalesAcum; 
    this.jugador.fechaActualizacion = usuarioLocalStorage.fechaActualizacion;
    this.nuevoJuego.nombre = "Piedra Papel o Tijera";
   }

  ngOnInit(): void {
  }
  seleccionJugadaJugador(jugada:string){
    switch(jugada){
      case 'piedra':
        this.seleccionJugador = this.pathsPPT[3];
        this.seleccionadoPorJugador="piedra";
        this.deseleccionarOtrosBotones("papel","tijera");
        break;
      case 'papel':
        this.seleccionJugador = this.pathsPPT[4];
        this.seleccionadoPorJugador="papel";
        this.deseleccionarOtrosBotones("piedra","tijera");
        break;
      case 'tijera':
        this.seleccionJugador = this.pathsPPT[5];
        this.seleccionadoPorJugador="tijera";
        this.deseleccionarOtrosBotones("papel","piedra");
        break;    
    }
    var btnSelect = document.getElementById(jugada);
    btnSelect.className = "btnSeleccionado";
    this.seleccionoOpcion=true;
  }
  deseleccionarOtrosBotones(boton1,boton2){
    var btnSelect1 = document.getElementById(boton1);
    var btnSelect2 = document.getElementById(boton2);
    btnSelect1.className = "btnJ";
    btnSelect2.className = "btnJ";
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

    this.deshabilitar=true;
    if(this.seleccionoOpcion){
    this.intervalId = setInterval(() => {
      this.tiempoAnimacion --;      
      this.estadoAnimJugada = this.estadoAnimJugada == "estado1" ? "estado2" : "estado1";
      if(this.tiempoAnimacion === 0) {  
        this.estadoAnimJugada = "estado1";
        this.seleccionJugadaContrincante();
        this.pathUsuario = this.seleccionJugador;
        this.tiempoAnimacion=6;
        var btnSelect = document.getElementById(this.seleccionadoPorJugador);
        btnSelect.className = "btnJ";
        this.deshabilitar=false;
        this.verificarEstadoDeLaJugada();
        clearInterval(this.intervalId);
      }         
    }, 550);  
  }

  else{
    this.MostarMensaje("Selecciona una opción",false,true);
  }
  }
  verificarEstadoDeLaJugada(){
    var esGanadaLaRonda = this.ganaLaRonda();

    if(esGanadaLaRonda && !this.esEmpate){
      this.jugador.puntos++;
      this.jugador.puntosTotalesAcum++;     
      this.MostarMensaje("Suertudo!",true);   
    }
    else if (!esGanadaLaRonda && !this.esEmpate){
      this.jugador.vidas--; 
      this.MostarMensaje("Esta ronda es mia!",false);       
    }

    if(this.esJuegoTerminado() && esGanadaLaRonda){      
        this.MostarMensaje("Bien lo tuyo",true);  
        this.nuevoJuego.gano=true;
             
        this.actualizarPuntosUsuario(); 
        this.nuevoJuego.actualizarDatosJuegos();
      }
    else if(this.esJuegoTerminado() && !esGanadaLaRonda){  
        this.MostarMensaje("Mejor la próxima!",false);
        this.nuevoJuego.gano=false;   
        this.actualizarPuntosUsuario(); 
        this.nuevoJuego.actualizarDatosJuegos();        
      }
      else if(this.esJuegoTerminado() && this.esEmpate){     
        this.jugador.fechaActualizacion =DateTimeHelper.getFechaYHora();     
        this.nuevoJuego.gano= esGanadaLaRonda ? true : false;
        this.actualizarPuntosUsuario(); 
        this.nuevoJuego.actualizarDatosJuegos();

      }
      this.esEmpate = false;
  }
  ganaLaRonda():boolean{
    var ganaRonda=false;

    if(this.seleccionadoPorJugador=="piedra" && this.seleccionContrincante=="papel"){
      ganaRonda=false;
     
    } 
    else if(this.seleccionadoPorJugador=="piedra" && this.seleccionContrincante=="tijera"){
      ganaRonda=true;      
      
    } 
    else if(this.seleccionadoPorJugador=="papel" && this.seleccionContrincante=="tijera"){
      ganaRonda=false;
      
    } 
    else if(this.seleccionadoPorJugador=="papel" && this.seleccionContrincante=="piedra"){
      ganaRonda=true;
  
    } 
    else if(this.seleccionadoPorJugador=="tijera" && this.seleccionContrincante=="piedra"){
      ganaRonda=false;
  
    } 
    else if(this.seleccionadoPorJugador=="tijera" && this.seleccionContrincante=="papel"){     
      ganaRonda=true;      
    } 
    else{
        this.MostarMensaje("Empate!",false,true); 
        this.esEmpate=true; 
    }
    return ganaRonda;
  }
  esJuegoTerminado(){
    if(this.jugador.vidas==0){
      this.juegoTerminado=true;      
      return true;         
    }    
    else if(this.jugador.puntos==3){
      this.juegoTerminado=true;
      return true;    
    }
  }
  actualizarPuntosUsuario(){
    var indexUser = LocalStorage.obtenerIndexUsuarioLogueado();
    if(indexUser!=-1){
      LocalStorage.actualizarUnUsuario(this.jugador,indexUser);
    }
  }  
  reiniciar(){
    this.juegoTerminado=false;
    this.jugador.vidas=3;
    this.jugador.puntos=0;
  }
  MostarMensaje(mensaje:string,ganador:boolean=false,empate:boolean=false) {
    this.Mensajes=mensaje;    
    var snackerBar = document.getElementById("snackbar");
    if(ganador)
      {
        snackerBar.className = "show Ganador";
      }else if(!ganador && !empate){
        snackerBar.className = "show Perdedor";
      }
      else{
        snackerBar.className = "show Empate";
      }
    var modelo=this;
    setTimeout(function(){ 
      snackerBar.className = snackerBar.className.replace("show", "");      
     }, 3000);
   } 
}
