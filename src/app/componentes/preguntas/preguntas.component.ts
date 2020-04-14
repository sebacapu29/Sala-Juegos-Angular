import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Preguntas } from 'src/app/clases/preguntas';
import { PreguntasService } from 'src/app/servicios/preguntas.service';
import { Jugador } from 'src/app/clases/jugador';
@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css'],
  animations:[
    trigger('animacion',[
      state('estado1',style({        
      })),
      state('estado2',style({
        marginLeft:'40%'
      })),
      transition('estado1 <=> estado2',animate('0.3s'))
    ]),
    trigger('animacion2',[
      state('estado1Anim2',style({
        
      })),
      state('estado2Anim2',style({
        marginLeft:'40%'
      })),     
      transition('estado1Anim2 <=> estado2Anim2',animate('0.5s'))     
    ]),
    trigger('animacion3',[
      state('estado1Anim3',style({
      })),
      state('estado2Anim3',style({
        marginLeft:'40%'
      })),     
      transition('estado1Anim3 <=> estado2Anim3',animate('0.6s'))     
    ]),
    trigger('animacion4',[
      state('estado1Anim4',style({
      })),
      state('estado2Anim4',style({
        marginLeft:'40%'
      })),     
      transition('estado1Anim4 <=> estado2Anim4',animate('0.7s'))     
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
  intervalId:any;
  contador:number =10;
  juegoPreguntas:Preguntas[];
  jugador:Jugador;

  constructor(private preguntasSerive:PreguntasService) { 
  this.juegoPreguntas = new Array<Preguntas>();
  this.jugador = new Jugador();
  this.jugador.gano = false; 
  this.preguntasSerive.getPreguntasYRespuestas().subscribe(data=> {     
    this.juegoPreguntas = data.map(item => 
      {
        return new Preguntas( 
          item["question"],
          item["answerec"],
          item["answere1"],
          item["answere2"]           
        );
      });
  }
  );
}
  ngOnInit(): void {
  }
  comenzar(){
    console.log(this.juegoPreguntas);  
    this.comenzoJuego=true;
    this.juegoTerminado=false;
    this.contador = 10;
      this.estadoAnimacion = "estado2";
      this.estadoAnimacion2="estado2Anim2";
      this.estadoAnimacion3="estado2Anim3";
      this.estadoAnimacion4="estado2Anim4";
  
    this.intervalId = setInterval(() => {
      this.contador = this.contador - 1;      
      if(this.contador === 0) {  
        this.clearGame();
      } 
      if(this.contador<10){
      }
      // if(this.contador === -1){
      //   this.contador = 10;
      // }     
  }, 1000);
  }
  evaluarRespuesta(e){
    console.log(e.target.value);
    if(e.target.value === "ninguna"){
      this.jugador.gano=true;
      this.clearGame();
      // clearInterval(this.intervalId);
    }
    else{
      this.jugador.gano=false;
      this.clearGame();
    }
  }
  clearGame(){
    this.comenzoJuego =false;
    this.juegoTerminado =true;
    this.estadoAnimacion="estado1";
    this.estadoAnimacion2 = "estado1Anim2";
    this.estadoAnimacion3 = "estado1Anim3";
    this.estadoAnimacion4 = "estado1Anim4";
     clearInterval(this.intervalId);
  }
}
