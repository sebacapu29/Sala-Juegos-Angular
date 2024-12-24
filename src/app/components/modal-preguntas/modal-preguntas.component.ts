import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-preguntas',
  templateUrl: './modal-preguntas.component.html',
  styleUrls: ['./modal-preguntas.component.css'],
  standalone:true,
  imports:[CommonModule]
})
export class ModalPreguntasComponent implements OnInit {
  
  @Input() mensaje:string="";
  @Input() gano:boolean=false;
  @Input() respCorrecta:string="";
  //@ts-ignore
  @Input() fin;
  @Input() imagenResultado:string="";  
  @Input() reglas:boolean=false;
  @Input() listaReglas:string[]=[];
  @Input() imgAyuda:string="";
  
  imageBackground="";
  constructor(public activeModal:NgbActiveModal) {        
  }

  ngOnInit(): void {
    // if(this.gano){
    //   this.imagenResultado="./assets/imagenes/festejo.PNG";
    // }
    // if(this.gano && this.fin){
    //   this.imagenResultado="./assets/imagenes/fondoFin.PNG";
    // }
  }

}
