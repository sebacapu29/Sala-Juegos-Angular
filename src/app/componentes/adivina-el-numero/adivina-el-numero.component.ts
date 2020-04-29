
import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina'
import { style, trigger, state, transition, animate } from '@angular/animations';
import { Jugador } from 'src/app/clases/jugador';
import { LocalStorage } from 'src/app/clases/helpers/local-storage';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css'],
  animations: [trigger('animacion',[
    state('estado1',style({ 
      opacity:'0'       
    })),
    state('estado2',style({
      opacity:'1'
    })),
    transition('estado1 <=> estado2',animate('0.5ms'))
  ])
]
})
export class AdivinaElNumeroComponent implements OnInit {
 @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();

  nuevoJuego: JuegoAdivina;
  jugador:Jugador;
  Mensajes:string;
  contador:number;
  ocultarVerificar:boolean;
  comenzoJuego:boolean;
  respuestasParaMostrar:any[];
  mensaje:string;
  mostrarEnemigo:boolean;
  animacionEnemigo:string;
  imagenEnemigo:string;
  listaNumeros:string[];
  imgEstrella:string;
  juegoTerminado:boolean;

  constructor() { 
    this.nuevoJuego = new JuegoAdivina();
    this.jugador = new Jugador();    
    console.info("numero Secreto:",this.nuevoJuego.numeroSecreto);  
    this.ocultarVerificar=false;
    this.comenzoJuego=false;
    this.respuestasParaMostrar = new Array<any>();
    this.mostrarEnemigo = false;
    this.mensaje="";
    this.animacionEnemigo="estado1";
    var usuarioLocalStorage:any;

    // this.imgEstrella = "/assets/imagenes/estrella.png";
    if(localStorage.getItem("usuarioLogueado")!=null){
      usuarioLocalStorage = JSON.parse(localStorage.getItem("usuarioLogueado"));              
    }    
    this.jugador = new Jugador(usuarioLocalStorage.nombre,usuarioLocalStorage.mail,usuarioLocalStorage.clave,usuarioLocalStorage.sexo,"Poderoso Conocimiento"); 
    this.nuevoJuego.jugador = this.jugador.mail;
    this.jugador.vidas=5;
    this.jugador.puntosTotalesAcum = usuarioLocalStorage.puntosTotalesAcum;    
    this.nuevoJuego.nombre = "Adivina el Número";
    
  }
  generarnumero() {
    this.nuevoJuego.generarnumero();
    this.listaDeNumerosAleatorios();    
    this.contador=0;
    this.comenzoJuego=true;
  }
  jugarOtraVez(){
    this.nuevoJuego = new JuegoAdivina();
    this.jugador.reiniciar();
    this.reiniciar();  
  }
  esJuegoTerminado(){
    if(this.jugador.puntos ==3){

      return true;
    }
    else if(this.jugador.vidas==0){
     
      return true;
    }
  }
  listaDeNumerosAleatorios(){
    const n = 5;
    this.listaNumeros = new Array(n);
    for (let i = 0; i < n; i++) {
        var numero = Math.round(Math.random() * (100  - 1) + 1);
        this.listaNumeros[i] = numero.toString();
    }
    this.listaNumeros[n]=this.nuevoJuego.numeroSecreto.toString();

    this.listaNumeros.sort(() => Math.random() > 0.5 ? 1 : -1);
  }
  reiniciar(){
    this.comenzoJuego=false;
  }
  evaluarRespuesta(numero)
  {
    this.contador++;
    this.nuevoJuego.numeroIngresado = numero;
    
    // console.info("numero Secreto:",this.nuevoJuego.gano);  
    if (this.nuevoJuego.verificar()){     
      this.nuevoJuego.numeroSecreto=0;
      this.jugador.puntos++;
      this.jugador.puntosTotalesAcum++;
      this.mostrarAnimacion("enojado");
      this.MostarMensaje("Grrr adivinaste",true);
      this.reiniciar();

    }else{

      let mensaje:string;
      this.mostrarAnimacion("contento");
      switch (this.contador) {
        case 1:
          mensaje="No, intento fallido, animo";
          break;
          case 2:
          mensaje="No,Te estaras Acercando???";
          break;
          case 3:
          mensaje="No es, Yo crei que la tercera era la vencida.";
          break;
          case 4:
          mensaje="No era el "+ this.nuevoJuego.numeroIngresado;
          break;
          case 5:
          mensaje=" intentos y nada.";
          break;
          case 6:
          mensaje="Afortunado en el amor";
          break;
      
        default:
            mensaje="Ya le erraste "+ this.contador+" veces";
          break;
      }
      this.jugador.vidas--;
      this.MostarMensaje("# "+this.contador+" "+mensaje+" ayuda : "+this.nuevoJuego.retornarAyuda());
      this.nuevoJuego.numeroIngresado=null;
     
    }
    if(this.esJuegoTerminado()){
      this.juegoTerminado =true;
      this.comenzoJuego=true;
      this.actualizarPuntosUsuario();
      this.nuevoJuego.actualizarDatosJuegos();
    }
  }  
  actualizarPuntosUsuario(){
    var indexUser = LocalStorage.obtenerIndexUsuarioLogueado();
    if(indexUser!=-1){
      LocalStorage.actualizarUnUsuario(this.jugador,indexUser);
    }
  }  
  mostrarAnimacion(estado:string){
    this.mostrarEnemigo=true;
    this.animacionEnemigo="estado2";
    if(estado==='enojado'){
      this.imagenEnemigo = "/assets/imagenes/enojado.gif";
    }
    else if(estado==='contento'){
      this.imagenEnemigo = "/assets/imagenes/risa.gif";
    }
    else if(estado==='noMostrar'){
      this.animacionEnemigo="estado1";
    }
    
    setTimeout(function(){ 
      this.animacionEnemigo="estado1";     
     }, 3000); 
  }
  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
    this.Mensajes=mensaje;    
    var x = document.getElementById("snackbar");
    if(ganador)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }
    var modelo=this;
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");  
      modelo.ocultarVerificar=true;   
      modelo.mostrarAnimacion('noMostrar');     
     }, 3000); 
   } 
  ngOnInit() {
  }

}
