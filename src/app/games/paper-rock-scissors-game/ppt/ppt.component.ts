import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../../classes/jugador';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { JuegoPiedraPapelTijera } from '../../../classes/juego-piedra-papel-tijera';
import { LocalStorage } from '../../../classes/helpers/local-storage';
import { DateTimeHelper } from '../../../classes/helpers/date-time';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPreguntasComponent } from '../../../components/modal-preguntas/modal-preguntas.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css'],
  imports:[CommonModule],
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
  seleccionContrincante:string="";
  seleccionJugador:string="";
  seleccionadoPorJugador:string="";
  jugador:Jugador;
  estadoAnimJugada:string;
  intervalId: any;
  valorSeleccionado:string;
  imageBackground:string="";
  Mensajes:string="";
  juegoTerminado:boolean=false;
  seleccionoOpcion:boolean=false;
  audio:any;
  nuevoJuego:JuegoPiedraPapelTijera;
  esEmpate:boolean=false;
  deshabilitar:boolean=false;

  constructor(private modalService: NgbModal) {
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
      //@ts-ignore
      usuarioLocalStorage = JSON.parse(localStorage.getItem("usuarioLogueado"));              
    }    
    this.jugador = new Jugador(usuarioLocalStorage.nombre,usuarioLocalStorage.mail,usuarioLocalStorage.clave,usuarioLocalStorage.sexo,"Piedra Papel o Tijera"); 
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
    //@ts-ignore
    btnSelect.className = "btnSeleccionado";
    this.seleccionoOpcion=true;
  }
  mostrarAyuda(){
    this.openModal(["Piedra Papel o Tijera","1) Haga click en una de las imagenes en la parte inferior (Seleccione su Jugada)","2) Click en Comenzar "],"OBJETIVO: El juego terminará cuando se le acaben las 3 vidas o gane 3 puntos (Nombrados en el contador en la parte superior con los iconos de corazon y el control)","" ,"./assets/imagenes/ppt-help.jpg");
  }
  openModal(reglas:string[],mensaje:string,respCorrect:string,urlImg:string){    
    const modalRef = this.modalService.open(ModalPreguntasComponent,{windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance.mensaje= mensaje;
    modalRef.componentInstance.respCorrecta=respCorrect;
    modalRef.componentInstance.imgAyuda = urlImg;
    modalRef.componentInstance.listaReglas= reglas;
    modalRef.componentInstance.reglas=true;
  }
  deseleccionarOtrosBotones(boton1:any, boton2:any){
    var btnSelect1 = document.getElementById(boton1);
    var btnSelect2 = document.getElementById(boton2);
    //@ts-ignore
    btnSelect1.className = "btnJ";
    //@ts-ignore
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
        console.log("ddd");
        this.estadoAnimJugada = "estado1";
        this.seleccionJugadaContrincante();
        this.pathUsuario = this.seleccionJugador;
        this.tiempoAnimacion=6;
        var btnSelect = document.getElementById(this.seleccionadoPorJugador);
        if(btnSelect!=null){
          btnSelect.className = "btnJ";
        }
        this.deshabilitar=false;
        this.seleccionadoPorJugador="";
        this.verificarEstadoDeLaJugada();
        clearInterval(this.intervalId);        
      }         
    }, 550);  
  }

  else{
    this.MostarMensaje("Selecciona una opción",false,true);
    this.deshabilitar=false;
    this.seleccionadoPorJugador="";
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
  //@ts-ignore
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
        //@ts-ignore
        snackerBar.className = "show Ganador";
      }else if(!ganador && !empate){
        //@ts-ignore
        snackerBar.className = "show Perdedor";
      }
      else{
        //@ts-ignore
        snackerBar.className = "show Empate";
      }
    var modelo=this;
    setTimeout(function(){ 
      //@ts-ignore
      snackerBar.className = snackerBar.className.replace("show", "");      
     }, 3000);
   } 
}
