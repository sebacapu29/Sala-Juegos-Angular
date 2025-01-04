import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../../classes/jugador';
import { JuegoAnagrama } from '../../../classes/juego-anagrama';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorage } from '../../../classes/helpers/local-storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPreguntasComponent } from '../../../components/modal-preguntas/modal-preguntas.component';
import { CommonModule } from '@angular/common';
import { ToastComponent } from "../../../components/toast/toast.component";
import { ToastService } from '../../../services/toast.service';
declare var bootstrap: any;

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css'],
  imports: [CommonModule, ToastComponent]
})
export class AnagramaComponent implements OnInit {

  jugador:Jugador;
  nuevoJuego:JuegoAnagrama;
  contadorTiempo=0;
  palabraDesordenada:string[]=[];
  lista:Array<any>;
  numeroAleatorio:number=0;
  juegoTerminado:boolean=false;
  bloqueoPantalla:boolean=false;
  public toastMessage: string = '';
  public toastType: string = 'text-bg-success';

  constructor(private modalService: NgbModal, private _toastService: ToastService) {
    var usuarioLocalStorage:any;

    if(localStorage.getItem("usuarioLogueado")!=null){
      //@ts-ignore
      usuarioLocalStorage = JSON.parse(localStorage.getItem("usuarioLogueado"));              
    } 
    this.nuevoJuego= new JuegoAnagrama();   
    this.jugador = new Jugador(usuarioLocalStorage.nombre,usuarioLocalStorage.mail,usuarioLocalStorage.clave,usuarioLocalStorage.sexo,"Ta Te ti"); 
    this.nuevoJuego.jugador = this.jugador.mail;
    
    this.jugador.puntosTotalesAcum = usuarioLocalStorage.puntosTotalesAcum; 
    this.jugador.fechaActualizacion = usuarioLocalStorage.fechaActualizacion;  
    this.nuevoJuego.nombre = "Anagrama";
    this.jugador.vidas=5;

    this.lista= [
    {"palabra":"ALICANTE"},{"palabra":"CALIENTE"},
    {"palabra":"SUSANA"},{ "palabra":"ROMA"},
    {"palabra":"NICOLAS"},{"palabra":"TRAMA"},
    {"palabra":"SERGIO"}, {"palabra":"PODER"}];

    this.comenzarJuego();
    this.openSnackBar("Comenzo el Juego!","s");
   }

   comenzarJuego(){
     this.bloqueoPantalla=false;
    this.juegoTerminado = false;
    this.numeroAleatorio =Math.round(Math.random() * (7  - 0) + 0);

    this.nuevoJuego.palabra = this.lista[this.numeroAleatorio]["palabra"].split('');
    var auxPalabraADesordenar:string[] = this.nuevoJuego.palabra.map(function(element){return element});
   this.palabraDesordenada = auxPalabraADesordenar.sort(() => Math.random() > 0.5 ? 1 : -1);
   
   var cantidadLetrasDePalabra = this.nuevoJuego.palabra.length;
   this.nuevoJuego.palabraUsuario = new Array<string>(cantidadLetrasDePalabra);
   this.nuevoJuego.palabraUsuario = this.nuevoJuego.palabra.map(function(){return ""});
   }
   mostrarAyuda(){
    this.openModal(["Anagrama","1) El Juego comienza ni bien termina de cargar la pantalla","2) Haga click en las letras completando la palabra en el tablero blanco "],"OBJETIVO: Completar la palabra en el tablero si es correcta ganará un punto. El juego terminará cuando se le acaben las 5 vidas o gane 3 puntos (Figura el contador en la parte superior con los iconos de corazon y el control)","" ,"./assets/imagenes/anagram-help.png");
  }
  openModal(reglas:string[],mensaje:string,respCorrect:string,urlImg:string){    
    const modalRef = this.modalService.open(ModalPreguntasComponent,{windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance.mensaje= mensaje;
    modalRef.componentInstance.respCorrecta=respCorrect;
    modalRef.componentInstance.imgAyuda = urlImg;
    modalRef.componentInstance.listaReglas= reglas;
    modalRef.componentInstance.reglas=true;
  }
   openSnackBar(mensaje:string, type:string){

    if (type=="e")
      this._toastService.showToast(mensaje,"error")
    else if(type =="w")
      this._toastService.showToast(mensaje,"warning")
    else
      this._toastService.showToast(mensaje,"success")

  }
  //@ts-ignore
   enviarLetra(letra){
     for (let index = 0; index < this.nuevoJuego.palabraUsuario.length; index++) {
       const element = this.nuevoJuego.palabraUsuario[index];

       if(element==""){
         this.nuevoJuego.palabraUsuario[index]= letra;
         break;
       }
     }
     if(this.completoLaPalabra()){
       if(this.verificarRespuesta()){  
         this.jugador.puntos++;
         this.jugador.puntosTotalesAcum++;               
         this.openSnackBar("Ronda ganada! groso!","s");         
         this.pasarANuevaPalabra();
         this.refrescarPantalla();
       }
       else{
         this.jugador.vidas--;
         this.openSnackBar("Intenta con otra palabra!","e");
         this.refrescarPantalla();
       }

     }
     if(this.esJuegoTerminado()){
       this.openSnackBar("Juego Terminado!","w");
       this.bloquearPantalla();
       this.nuevoJuego.actualizarDatosJuegos();
       this.actualizarPuntosUsuario();
     }
   }
   borrarUltimaLetra(){
     var indexUltimaLetra =this.nuevoJuego.palabraUsuario.length-1;

    for (let index = indexUltimaLetra; index >= 0; index--) {
      const element = this.nuevoJuego.palabraUsuario[index];
      if(element!=""){
        this.nuevoJuego.palabraUsuario[index]="";
        break;        
      }
    }
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
   bloquearPantalla(){
    this.bloqueoPantalla=true;
   }
   mostrarMensaje(){
    this._toastService.showToast("Haga Click en Jugar Otra Vez", "warning");
   }
   actualizarPuntosUsuario(){
    var indexUser = LocalStorage.obtenerIndexUsuarioLogueado();
    if(indexUser!=-1){
      LocalStorage.actualizarUnUsuario(this.jugador,indexUser);
    }
  } 
   refrescarPantalla(){
      var cantidadLetrasDePalabra = this.nuevoJuego.palabra.length;
      this.nuevoJuego.palabraUsuario = new Array<string>(cantidadLetrasDePalabra);
      this.nuevoJuego.palabraUsuario = this.nuevoJuego.palabra.map(function(){return ""});
   }
   pasarANuevaPalabra(){
     this.comenzarJuego();
   }
   jugarOtraVez(){
    this.jugador.puntos =0;
    this.jugador.vidas =5;
     this.comenzarJuego();
   }
   completoLaPalabra(){

     var contadorLetras=0;
     
    //  if(cantidadAciertos)
    for (let index = 0; index < this.nuevoJuego.palabraUsuario.length; index++) {
      const element = this.nuevoJuego.palabraUsuario[index];

      if(element!=""){
        contadorLetras++;        
      }
    }
    
    if(contadorLetras == this.nuevoJuego.palabraUsuario.length){
      return true;
    }
    return false;
  }
  verificarRespuesta(){
    var cantidadAciertos=0;
    var contadorLetrasCorrectoas=0;

    if(cantidadAciertos==0)
    for (let index = 0; index < this.nuevoJuego.palabraUsuario.length; index++) {
      const letraIngresadaPorUsuario = this.nuevoJuego.palabraUsuario[index];
      if(letraIngresadaPorUsuario.toLowerCase() === this.nuevoJuego.palabra[index].toLowerCase()){
        contadorLetrasCorrectoas++;
      }
    }
    if(contadorLetrasCorrectoas== this.nuevoJuego.palabra.length){
      return true;
    }
    return false;
  }
  ngOnInit(): void {
    
  }

}
