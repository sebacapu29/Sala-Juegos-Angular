import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/clases/jugador';
import { JuegoAnagrama } from 'src/app/clases/juego-anagrama';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorage } from 'src/app/clases/helpers/local-storage';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  jugador:Jugador;
  nuevoJuego:JuegoAnagrama;
  contadorTiempo=0;
  palabraDesordenada:string[];
  lista:Array<any>;
  numeroAleatorio:number;
  juegoTerminado:boolean=false;
  bloqueoPantalla:boolean=false;

  constructor(private _snackBar: MatSnackBar) {
    var usuarioLocalStorage:any;

    if(localStorage.getItem("usuarioLogueado")!=null){
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
    this.openSnackBar("Comenzo el Juego!","Juego");
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
   openSnackBar(mensaje:string,titulo:string){
    this._snackBar.open(mensaje,titulo,{duration:5000});
  }
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
         this.openSnackBar("Ronda ganada! groso!","Juego");         
         this.pasarANuevaPalabra();
         this.refrescarPantalla();
       }
       else{
         this.jugador.vidas--;
         this.openSnackBar("Intenta con otra palabra!","Juego");
         this.refrescarPantalla();
       }

     }
     if(this.esJuegoTerminado()){
       this.openSnackBar("Juego Terminado!","Juego");
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
    this.openSnackBar("Haga Click en Jugar Otra Vez","Juego");
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
