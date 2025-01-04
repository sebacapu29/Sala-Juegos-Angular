import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../../classes/juego-agilidad';
import {Subscription} from "rxjs";
import {timer} from "rxjs";
import { Jugador } from '../../../classes/jugador';
import { style, trigger, state, transition, animate } from '@angular/animations';
import { LocalStorage } from '../../../classes/helpers/local-storage';
import { DateTimeHelper } from '../../../classes/helpers/date-time';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPreguntasComponent } from '../../../components/modal-preguntas/modal-preguntas.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from "../../../components/toast/toast.component";
import { ToastService } from '../../../services/toast.service';
declare var bootstrap: any;
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
  ]),
],
imports: [CommonModule, FormsModule, ToastComponent]
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
  mensaje:string="";
  deshabilitar:boolean=false;
  jugador:Jugador= new Jugador;
  durationInSeconds = 5;  
  //@ts-ignore
  private subscription: Subscription;
  respuestasParaMostrar: string[];
  listaNumeros: any[]=[];
  // usuariosEnLocalStorage: any;
  toastMessage: string = '';
  toastType: string = 'text-bg-success';

  ngOnInit() {
  }
   constructor(private modalService: NgbModal, private toastService:ToastService) {
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
      //@ts-ignore
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
  mostrarAyuda(){
    this.openModal(["Agilidad Aritmetica","1) El juego comienza cuando termina de cargar la pagina","2) Click en una de las 3 posibles respuestas (Botones Rojos)","3) Para volver a realizar otra operación click en 'Nuevo' (Botón Verde)"],"OBJETIVO: Realizar en el tiempo que figura en pantalla la operación que figura en la caja blanca (Suma + ; Resta - ; División / ; Multiplicación *) El juego terminará cuando se le acaben las 3 vidas o gane 3 puntos (Figura en el contador en la parte superior con los iconos de corazon y el control) NOTA: Las divisiones se redondean dando como resultado números enteros","" ,"./assets/imagenes/agilidad-help.jpg");
  }
  openModal(reglas:string[],mensaje:string,respCorrect:string,urlImg:string){    
    const modalRef = this.modalService.open(ModalPreguntasComponent,{windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance.mensaje= mensaje;
    modalRef.componentInstance.respCorrecta=respCorrect;
    modalRef.componentInstance.imgAyuda = urlImg;
    modalRef.componentInstance.listaReglas= reglas;
    modalRef.componentInstance.reglas=true;
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
        //@ts-ignore
        this.nuevoJuego.gano=this.comprobarResultado();        
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
  Reiniciar(){
    this.nuevoJuego = new JuegoAgilidad();
    this.jugador.reiniciar();
    this.NuevoJuego();
  }
  //@ts-ignore
  evaluarRespuesta(e){

    if(e.target.value === this.nuevoJuego.resultado.toString()){        
      this.toastService.showToast("Correcto!", "success");
      this.jugador.puntos++;
      this.jugador.puntosTotalesAcum++;
    }

    else{
      this.toastService.showToast("Noo! la correcta es:  " + this.nuevoJuego.resultado, "error");     
      this.jugador.vidas--;
    }
    this.deshabilitar=true;
    if(this.verificadorJuegoTerminado()){
      this.nuevoJuego.juegoTerminado = true;
      this.ocultarVerificar=false;
      var mensaje = this.nuevoJuego.gano ? "Muy bien! Ganaste!" : "Juego perdido vaquero";
      
      this.actualizarPuntosUsuario();
      this.nuevoJuego.actualizarDatosJuegos(); 
           
      this.toastService.showToast(mensaje, "warning");
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
  //@ts-ignore
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
