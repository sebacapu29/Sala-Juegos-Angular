import { Component, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { JuegoTateti } from '../../../classes/juego-tateti';

import { Jugador } from '../../../classes/jugador';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LocalStorage } from '../../../classes/helpers/local-storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPreguntasComponent } from '../../../components/modal-preguntas/modal-preguntas.component';
import { MatRadioGroup, MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

declare var bootstrap: any;

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css'],
  imports:[CommonModule, MatRadioModule, MatRadioGroup],
  schemas:[NO_ERRORS_SCHEMA]
})
export class TatetiComponent implements OnInit {

  tablero:any;
  nuevoJuego:JuegoTateti;
  jugador:Jugador;
  ocultarSeleccionFichas=false;
  contadorTiempo=0;
  comenzoJuego=false;
  juegoTerminado=false;
  tableroBloqueado=false;
  public toastMessage: string = '';
  public toastType: string = 'text-bg-success';
  constructor(private _toastService:ToastService,
    private modalService: NgbModal) {
    this.tablero=[
      {ocupada: false, ficha: "", posicion: [0,0]},
      {ocupada: false, ficha: "", posicion: [0,1]}, 
      {ocupada: false, ficha: "", posicion: [0,2]},
      {ocupada: false, ficha: "", posicion: [1,0]},
      {ocupada: false, ficha: "", posicion: [1,1]},
      {ocupada: false, ficha: "", posicion: [1,2]},
      {ocupada: false, ficha: "", posicion: [2,0]},
      {ocupada: false, ficha: "", posicion: [2,1]},
       {ocupada: false, ficha: "", posicion: [2,2]}
    ];
    var usuarioLocalStorage:any;

    if(localStorage.getItem("usuarioLogueado")!=null){
      //@ts-ignore
      usuarioLocalStorage = JSON.parse(localStorage.getItem("usuarioLogueado"));              
    } 
    this.nuevoJuego= new JuegoTateti();   
    this.jugador = new Jugador(usuarioLocalStorage.nombre,usuarioLocalStorage.mail,usuarioLocalStorage.clave,usuarioLocalStorage.sexo,"Ta Te ti"); 
    this.nuevoJuego.jugador = this.jugador.mail;
    
    this.jugador.puntosTotalesAcum = usuarioLocalStorage.puntosTotalesAcum; 
    this.jugador.fechaActualizacion = usuarioLocalStorage.fechaActualizacion;   
    this.nuevoJuego.nombre = "Ta te ti";
    this.nuevoJuego.ficha="x"   
    this.bloquearDesbloqTablero(true); 
   }

  ngOnInit(): void {
  }
  //@ts-ignore
  llenarCasillero(posicion1,posicion2){
    posicion1 = Math.floor(posicion1 / 3);
    posicion2 = posicion2 % 3 ;
    this.nuevoJuego.fichaEnemigo = this.nuevoJuego.ficha == "x" ? "o" : "x";

    var posicionCelda = this.esCasilleroOcupado(posicion1,posicion2);
    var tableroCompleto = this.esTableroCompleto();

    if(posicionCelda!=-1){
      this.tablero[posicionCelda].ficha = this.nuevoJuego.ficha;      
      this.tablero[posicionCelda].ocupada=true;
    }
    if(this.esRondaGanada(this.nuevoJuego.ficha)){      
      this.jugador.puntos++;
      this.jugador.puntosTotalesAcum++;
      this._toastService.showToast("Ganaste la ronda!", "success");
      this.bloquearDesbloqTablero(true);
      if(this.esJuegoTerminado()){
    
        this.nuevoJuego.actualizarDatosJuegos();
        this.actualizarPuntosUsuario();
        this._toastService.showToast("Muy bien me Ganaste, intentemos de nuevo!", "success");
      }
      return;
      //juegoTerminado
    }


    do{
      tableroCompleto = this.esTableroCompleto();
      var seleccionMaquinaFila = Math.round(Math.random() * (8  - 0) + 0); 
      var seleccionMaquinaColumna = Math.round(Math.random() * (8  - 0) + 0); 
      
      var posicionCeldaEnemigo = this.esCasilleroOcupado(seleccionMaquinaFila,seleccionMaquinaColumna);
      var esPosicionOcupada = posicionCeldaEnemigo == -1;
    
    }while(esPosicionOcupada && !tableroCompleto);

    if(!tableroCompleto){
      this.tablero[posicionCeldaEnemigo].ficha = this.nuevoJuego.fichaEnemigo;      
      this.tablero[posicionCeldaEnemigo].ocupada=true;
      if(this.esRondaGanada(this.nuevoJuego.fichaEnemigo)){ 
        this.jugador.vidas--;       
        this._toastService.showToast("Ops Perdiste la ronda", "error");
        if(this.esJuegoTerminado()){
        
          this.nuevoJuego.actualizarDatosJuegos();
          this.actualizarPuntosUsuario();
          this._toastService.showToast("Perdiste el juego! vuelve a intentar!", "warning");
        }       
        this.bloquearDesbloqTablero(true);
      }
    }
    
    else{
      this._toastService.showToast("Empate!", "warning");
    }
    if(this.esJuegoTerminado()){      
    
      this.nuevoJuego.actualizarDatosJuegos();
      this.actualizarPuntosUsuario();
    }
  }
  mostrarAyuda(){
    this.openModal(["Ta Te Ti","1) Seleccione su Ficha (X - O) Debajo del tablero","2) Click en el botón verde (Comenzar) "],"OBJETIVO: Para ganar hay que completar en diagonal, horizontal o de forma vertical con la ficha seleccionada. El juego terminará cuando se le acaben las 3 vidas o gane 3 puntos (Nombrados en el contador en la parte superior con los iconos de corazon y el control)","" ,"./assets/imagenes/tateti-help.png");
  }
  openModal(reglas:string[],mensaje:string,respCorrect:string,urlImg:string){    
    const modalRef = this.modalService.open(ModalPreguntasComponent,{windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance.mensaje= mensaje;
    modalRef.componentInstance.respCorrecta=respCorrect;
    modalRef.componentInstance.imgAyuda = urlImg;
    modalRef.componentInstance.listaReglas= reglas;
    modalRef.componentInstance.reglas=true;
  }
  mostrarMensajeInicial(){
    this._toastService.showToast("Haga click para comenzar!", "warning");
  }

  actualizarPuntosUsuario(){
    var indexUser = LocalStorage.obtenerIndexUsuarioLogueado();
    if(indexUser!=-1){
      LocalStorage.actualizarUnUsuario(this.jugador,indexUser);
    }
  } 
  //@ts-ignore 
  bloquearDesbloqTablero(bloqueo){
    this.tableroBloqueado=bloqueo;
    // this.juegoTerminado=true;
  }
 //@ts-ignore
    esJuegoTerminado(){
      if(this.jugador.vidas ==0){
        this.juegoTerminado=true;
        this.jugador.gano=false;
        this.nuevoJuego.gano=false;
        return true;
      }
      else if(this.jugador.puntos==3){
        this.jugador.gano=true;
        this.nuevoJuego.gano=true;
        this.juegoTerminado=true;
        return true;
      }
    }
  reiniciarTablero(){
    for (let index = 0; index < this.tablero.length; index++) {
      const celda = this.tablero[index];
      celda.ficha="";
      celda.ocupada=false;               
    }
  }
  esTableroCompleto(){
    var contadorCeldas=0;
    for (let index = 0; index < this.tablero.length; index++) {
      const celda = this.tablero[index];
      if(celda.ocupada){
        contadorCeldas++;
      }               
    }

    if(contadorCeldas==this.tablero.length){
      return true;
    }
    return false;
  }
  //@ts-ignore
  esRondaGanada(ficha){
    if (this.tablero[0].ficha == ficha && this.tablero[1].ficha == ficha && this.tablero[2].ficha == ficha)
    return true
    if (this.tablero[3].ficha == ficha && this.tablero[4].ficha == ficha && this.tablero[5].ficha == ficha)
    return true
    if (this.tablero[6].ficha == ficha && this.tablero[7].ficha == ficha && this.tablero[8].ficha == ficha)
    return true
    if (this.tablero[0].ficha == ficha && this.tablero[3].ficha == ficha && this.tablero[6].ficha == ficha)
    return true
    if (this.tablero[1].ficha == ficha && this.tablero[4].ficha == ficha && this.tablero[7].ficha == ficha)
    return true
    if (this.tablero[2].ficha == ficha && this.tablero[5].ficha == ficha && this.tablero[8].ficha == ficha)
    return true
    if (this.tablero[0].ficha == ficha && this.tablero[4].ficha == ficha && this.tablero[8].ficha == ficha)
    return true
    if (this.tablero[2].ficha == ficha && this.tablero[4].ficha == ficha && this.tablero[6].ficha == ficha)
    return true

  return false;
  }

  //Devuelve -1 si la celda esta ocupada
  //@ts-ignore
  esCasilleroOcupado(fila,columna){
    var indexTablero=-1;

    for (let index = 0; index < this.tablero.length; index++) {
      const celda = this.tablero[index];  
      if(celda.posicion[0] === fila && celda.posicion[1] === columna){      
      if(!celda.ocupada){

        indexTablero=index;        
      }      
    }
    }
    return indexTablero;
  }
  comenzar(){
    this.reiniciarTablero();
    this.ocultarSeleccionFichas=true;
    this.bloquearDesbloqTablero(false);    
  }


  jugarOtraVez(){
    this.jugador.puntos =0;
    this.jugador.vidas =3;
    this.juegoTerminado=false;
    this.comenzar();
  }
}
