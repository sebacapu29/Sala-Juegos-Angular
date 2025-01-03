import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Preguntas } from '../../../classes/preguntas';
import { PreguntasService } from '../../../services/preguntas.service';
import { Jugador } from '../../../classes/jugador';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPreguntasComponent } from '../../../components/modal-preguntas/modal-preguntas.component';
import { JuegoPreguntas } from '../../../classes/juego-preguntas';
import { LocalStorage } from '../../../classes/helpers/local-storage';
import { DateTimeHelper } from '../../../classes/helpers/date-time';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
  imports:[CommonModule],
  animations:[  
    trigger('animacion2',[
      state('estado1Anim2',style({
        opacity:'0'
      })),
      state('estado2Anim2',style({
        opacity:'1'
      })),     
      transition('estado1Anim2 <=> estado2Anim2',animate('2s'))
    ]),
    trigger('animacion3',[
      state('estado1Anim3',style({
        opacity:'0'
      })),
      state('estado2Anim3',style({
        opacity:'1'
      })),     
      transition('estado1Anim3 <=> estado2Anim3',animate('2s'))     
    ]),
    trigger('animacion4',[
      state('estado1Anim4',style({
        opacity:'0'
      })),
      state('estado2Anim4',style({
        opacity:'1'
      })),     
      transition('estado1Anim4 <=> estado2Anim4',animate('2s'))     
    ])
  ]
})
export class PreguntasComponent implements OnInit {

  comenzoJuego:boolean=false;
  juegoTerminado:boolean=false;
  estadoAnimacion2 = "estado1Anim2";
  estadoAnimacion3="estado1Anim3";
  estadoAnimacion4 = "estado1Anim4";
  imagenCofre ="./assets/imagenes/cofre.jpg";
  mensajeJuego:string="";
  intervalId:any;
  contadorTiempo:number =20;
  contadorTiempoAnimacion:number=4;
  minQ:number = 0;
  maxQ:number = 14;
  cofreOculto:boolean=true;
  respuestasParaMostrar:string[]=["","",""];
  @Output() juegoGanado: EventEmitter<boolean> = new EventEmitter<boolean>();
  juegoPreguntas:Preguntas[];
  preguntaSeleccionada:Preguntas;
  jugador:Jugador;
  randomCuriosidad:number=0;
  audio:any;
  nuevoJuego:JuegoPreguntas= new JuegoPreguntas;

  constructor(private preguntasSerive:PreguntasService,
    private modalService: NgbModal) { 
    this.juegoPreguntas = new Array<Preguntas>();
    this.jugador = new Jugador();
    this.jugador.vidas=3;
    this.jugador.puntos=0;
    this.preguntaSeleccionada = new Preguntas("",""," ","");
    this.jugador.gano = false; 
    this.preguntasSerive.getPreguntasYRespuestas().subscribe(data=> {     
    this.juegoPreguntas =  data as Preguntas[];  
    this.nuevoJuego= new JuegoPreguntas();
    this.configuracionesIniciarles();
    this.maxQ = this.juegoPreguntas.length - 1;  
    this.nuevoJuego.numCuriosidad =Math.round(Math.random() * (3  - 1) + 1);;      
    this.audio = new Audio();    
    var usuarioLocalStorage:any;

    if(localStorage.getItem("usuarioLogueado")!=null){
      //@ts-ignore
      usuarioLocalStorage = JSON.parse(localStorage.getItem("usuarioLogueado"));              
    }    
    this.jugador = new Jugador(usuarioLocalStorage.nombre,usuarioLocalStorage.mail,usuarioLocalStorage.clave,usuarioLocalStorage.sexo,"Conocimiento"); 
    this.nuevoJuego.jugador = this.jugador.mail;
    this.jugador.puntosTotalesAcum = usuarioLocalStorage.puntosTotalesAcum;
    this.nuevoJuego.nombre = "Conocimiento";
  }
  );
}
  ngOnInit(): void {

  }
  configuracionesIniciarles(){
    var usuarioLocalStorage:any;
    if(localStorage.getItem("usuarioLogueado")!=null){
      //@ts-ignore
      usuarioLocalStorage = JSON.parse(localStorage.getItem("usuarioLogueado"));              
    }    
    this.jugador = new Jugador(usuarioLocalStorage.nombre,usuarioLocalStorage.mail,usuarioLocalStorage.clave,usuarioLocalStorage.sexo,"Conocimiento"); 
    this.nuevoJuego.jugador = this.jugador.mail;
    this.jugador.puntosTotalesAcum = usuarioLocalStorage.puntosTotalesAcum;
    this.jugador.fechaActualizacion = usuarioLocalStorage.fechaActualizacion;
    this.nuevoJuego.nombre = "Conocimiento";
  }
  
  comenzar(){
    if(this.jugador.vidas>0 && this.juegoPreguntas.length>0){
    
    var randomQuestion = Math.round(Math.random() * (this.maxQ  - this.minQ) + this.minQ);
    this.preguntaSeleccionada = this.juegoPreguntas[randomQuestion];    
    var indexPreguntas = this.juegoPreguntas.indexOf(this.preguntaSeleccionada);
    this.maxQ--;

    this.seleccionRandomRespuestas();
    //poner llamadas de actualizacion de puntos
    this.comenzoJuego=true;
    this.juegoTerminado=false;
    this.contadorTiempo = 20;
    this.iniciarAnimacion();

      this.intervalId = setInterval(() => {
      this.contadorTiempo -= 1;      
      if(this.contadorTiempo === 0) {  
        this.openModal("Se agoto el tiempo!","La respuesta correcta es: " + this.preguntaSeleccionada.answerc,"./assets/imagenes/respuesta-incorrecta.jpg");        
        this.clearGame();
      }         
  }, 1000);
    this.juegoPreguntas.splice(indexPreguntas,1);
  }
  }
  iniciarAnimacion(){
    var Tiempo=3;

    var intervalId= setInterval(()=>{ 
    
      if(Tiempo==3 ) {
        this.estadoAnimacion2="estado2Anim2";       
      }
      else if(Tiempo==2){
        this.estadoAnimacion3="estado2Anim3";
      }
      else if(Tiempo==1){
        this.estadoAnimacion4="estado2Anim4"; 
        Tiempo=3;       
        clearInterval(intervalId);
      }
      Tiempo--;
      }, 200);
  }
  //@ts-ignore
  esJuegoTerminado(){
    if(this.juegoPreguntas.length ==0){
      this.audio.src = "./assets/sonidos/sonido-victoria.mp3";
      this.audio.load();
      this.audio.play();
      this.nuevoJuego.gano=true;
      this.cofreOculto =false;
      this.openModal("Felicitaciones! Terminaste El Juego!","Ahora puedes abrir el cofre del conocimiento ubicado al comienzo del juego","./assets/imagenes/winner.png");
      this.clearGame();
      return true;
    }
    else if(this.jugador.vidas==0){
      this.audio.src = "./assets/sonidos/sonido-pierde2.mp3";
      this.audio.load();
      this.audio.play();
      this.nuevoJuego.gano=false;
      return true;
    }
  }
  jugarOtraVez(){
    this.jugador.puntos =0;
    this.jugador.vidas =3;
    this.juegoTerminado=false;
    this.cofreOculto=true;
    if(this.juegoPreguntas.length==0){
      this.preguntasSerive.getPreguntasYRespuestas().subscribe(data=> {     
        this.juegoPreguntas =  data as Preguntas[];  
        this.maxQ = this.juegoPreguntas.length;    
      });
    }
  }
  seleccionRandomRespuestas(){
  
       this.respuestasParaMostrar = new Array<string>();
         this.respuestasParaMostrar.push(this.preguntaSeleccionada.answerc);    
        this.respuestasParaMostrar.push(this.preguntaSeleccionada.answer1);
        this.respuestasParaMostrar.push(this.preguntaSeleccionada.answer2);  
        this.respuestasParaMostrar.sort(() => Math.random() > 0.5 ? 1 : -1);
    
  }
  mostrarAyuda(){
    
  }
  evaluarRespuesta(e:any){

    if(e.target.value === this.preguntaSeleccionada.answerc){
      this.jugador.gano=true;  
      this.jugador.puntos++;  
      this.jugador.puntosTotalesAcum++;  
      this.openModal("Bravo! Correcto","","./assets/imagenes/respuesta-correcta.jpg");
      this.clearGame();
    }
    else{
      this.jugador.gano=false;
      this.jugador.vidas--;
      this.openModal("Ups! Lastima, Incorrecta!","La respuesta correcta es: " + this.preguntaSeleccionada.answerc,"./assets/imagenes/respuesta-incorrecta.jpg");         
      this.clearGame();
    }
    if(this.esJuegoTerminado()){
      this.nuevoJuego.actualizarDatosJuegos();
      this.actualizarPuntosUsuario();
    }
  }
  
  clearGame(){
    this.comenzoJuego =false;
    this.juegoTerminado = this.juegoPreguntas.length==0;  
    this.estadoAnimacion2 = "estado1Anim2";
    this.estadoAnimacion3 = "estado1Anim3";
    this.estadoAnimacion4 = "estado1Anim4";
     clearInterval(this.intervalId);
  }
  openModal(mensaje:string,respCorrect:string,urlImg:string){    
    const modalRef = this.modalService.open(ModalPreguntasComponent,{windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance.mensaje= mensaje;
    modalRef.componentInstance.respCorrecta=respCorrect;
    modalRef.componentInstance.imagenResultado = urlImg;
  }
  actualizarPuntosUsuario(){
    var indexUser = LocalStorage.obtenerIndexUsuarioLogueado();
    if(indexUser!=-1){
      LocalStorage.actualizarUnUsuario(this.jugador,indexUser);
    }
  }  
  abrirCofre(){
    var strCuriosidad="";
    this.preguntasSerive.getCuriosidades().subscribe(data=> {  
 
      strCuriosidad = data[this.nuevoJuego.numCuriosidad ]["curiosidad"];  
      this.openModal("Cofre del conocimiento",strCuriosidad,""); 
    });  
    
  }
}
