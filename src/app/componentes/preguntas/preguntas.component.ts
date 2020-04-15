import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Preguntas } from 'src/app/clases/preguntas';
import { PreguntasService } from 'src/app/servicios/preguntas.service';
import { Jugador } from 'src/app/clases/jugador';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPreguntasComponent } from '../modal-preguntas/modal-preguntas.component';


@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
  animations:[
    trigger('animacion',[
      state('estado1',style({        
      })),
      state('estado2',style({
        marginLeft:'10%'
      })),
      transition('estado1 <=> estado2',animate('0.3s'))
    ]),
    trigger('animacion2',[
      state('estado1Anim2',style({
        
      })),
      state('estado2Anim2',style({
        marginLeft:'14%'
      })),     
      transition('estado1Anim2 <=> estado2Anim2',animate('0.2s'))     
    ]),
    trigger('animacion3',[
      state('estado1Anim3',style({
      })),
      state('estado2Anim3',style({
        marginLeft:'14%'
      })),     
      transition('estado1Anim3 <=> estado2Anim3',animate('0.3s'))     
    ]),
    trigger('animacion4',[
      state('estado1Anim4',style({
      })),
      state('estado2Anim4',style({
        marginLeft:'14%'
      })),     
      transition('estado1Anim4 <=> estado2Anim4',animate('0.5s'))     
    ])
  ]
})
export class PreguntasComponent implements OnInit {

  comenzoJuego:boolean=false;
  juegoTerminado:boolean=false;
  estadoAnimacion="estado1";
  estadoAnimacion2 = "estado1Anim2";
  estadoAnimacion3="estado1Anim3";
  estadoAnimacion4 = "estado1Anim4";
  imageBackground="./assets/imagenes/juegoFondo1.PNG";
  imagenCofre ="./assets/imagenes/cofre.jpg";
  mensajeJuego:string;
  intervalId:any;
  contadorTiempo:number =20;
  minQ:number = 0;
  maxQ:number = 14;
  cofreOculto:boolean=true;
  respuestasParaMostrar:string[]=["","",""];
  @Output() juegoGanado: EventEmitter<boolean> = new EventEmitter<boolean>();
  juegoPreguntas:Preguntas[];
  preguntaSeleccionada:Preguntas;
  jugador:Jugador;
  randomCuriosidad:number;

  constructor(private preguntasSerive:PreguntasService,
    private modalService: NgbModal) { 
    this.juegoPreguntas = new Array<Preguntas>();
    this.jugador = new Jugador();
    this.jugador.vidas=3;
    this.jugador.puntos=0;
    this.preguntaSeleccionada = new Preguntas("","","","");
    this.jugador.gano = false; 
    this.preguntasSerive.getPreguntasYRespuestas().subscribe(data=> {     
    this.juegoPreguntas =  data as Preguntas[];  
    this.maxQ = this.juegoPreguntas.length - 1;  
    this.randomCuriosidad=Math.round(Math.random() * (3  - 1) + 1);;  
  }
  );
}
  ngOnInit(): void {
  }
  comenzar(){
    if(this.jugador.vidas>0 && this.juegoPreguntas.length>0){
    
    var randomQuestion = Math.round(Math.random() * (this.maxQ  - this.minQ) + this.minQ);
    this.preguntaSeleccionada = this.juegoPreguntas[randomQuestion];    
    var indexPreguntas = this.juegoPreguntas.indexOf(this.preguntaSeleccionada);
    this.maxQ--;

    this.randomSeleccion();
    
    this.comenzoJuego=true;
    this.juegoTerminado=false;
    this.contadorTiempo = 20;
      this.estadoAnimacion = "estado2";
      this.estadoAnimacion2="estado2Anim2";
      this.estadoAnimacion3="estado2Anim3";
      this.estadoAnimacion4="estado2Anim4";
    this.intervalId = setInterval(() => {
      this.contadorTiempo -= 1;      
      if(this.contadorTiempo === 0) {  
        this.openModal("Se agoto el tiempo!","La respuesta correcta es: " + this.preguntaSeleccionada.answerc,"./assets/imagenes/llorando.PNG");        
        this.clearGame();
      }         
  }, 1000);
    this.juegoPreguntas.splice(indexPreguntas,1);
  }
  }
  verificadorJuegoTerminado(){
    if(this.juegoPreguntas.length ==0){
      // this.modalService.dismissAll();
      this.cofreOculto =false;
      this.openModal("Felicitaciones! Terminaste El Juego!","Ahora puedes abrir el cofre del conocimiento ubicado al comienzo del juego","./assets/imagenes/fondoFin.PNG");
      this.clearGame();
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
  randomSeleccion(){
    var randomAnswes = Math.round(Math.random() * (3  - 1) + 1);
   
    this.respuestasParaMostrar = new Array<string>();
    switch(randomAnswes){
      case 1:
        this.respuestasParaMostrar.push(this.preguntaSeleccionada.answerc);    
        this.respuestasParaMostrar.push(this.preguntaSeleccionada.answer1);
        this.respuestasParaMostrar.push(this.preguntaSeleccionada.answer2);
        break;
      case 2:
        this.respuestasParaMostrar.push(this.preguntaSeleccionada.answer1);    
        this.respuestasParaMostrar.push(this.preguntaSeleccionada.answerc);
        this.respuestasParaMostrar.push(this.preguntaSeleccionada.answer2);
          break;
      case 3:
        this.respuestasParaMostrar.push(this.preguntaSeleccionada.answer1);    
        this.respuestasParaMostrar.push(this.preguntaSeleccionada.answer2);
        this.respuestasParaMostrar.push(this.preguntaSeleccionada.answerc);
         break;
    }
  }
  evaluarRespuesta(e){

    if(e.target.value === this.preguntaSeleccionada.answerc){
      this.jugador.gano=true;
      this.jugador.puntos++;    
      this.openModal("Bravo! Correcto","","./assets/imagenes/festejo.PNG");
      this.clearGame();
    }
    else{
      this.jugador.gano=false;
      this.jugador.vidas--;
      this.openModal("Ups! Lastima, Incorrecta!","La respuesta correcta es: " + this.preguntaSeleccionada.answerc,"./assets/imagenes/llorando.PNG");         
      this.clearGame();
    }
    this.verificadorJuegoTerminado();
  }
  clearGame(){
    this.comenzoJuego =false;
    this.juegoTerminado = this.juegoPreguntas.length==0;
    this.estadoAnimacion="estado1";
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
  abrirCofre(){
    var strCuriosidad="";
    this.preguntasSerive.getCuriosidades().subscribe(data=> {  
 
      strCuriosidad = data[this.randomCuriosidad]["curiosidad"];  
      this.openModal("Cofre del conocimiento",strCuriosidad,""); 
    });  
    
  }
}
