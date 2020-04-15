import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-preguntas',
  templateUrl: './modal-preguntas.component.html',
  styleUrls: ['./modal-preguntas.component.css']
})
export class ModalPreguntasComponent implements OnInit {
  
  @Input() mensaje;
  @Input() gano;
  @Input() respCorrecta;
  @Input() fin;
  @Input() imagenResultado:string;  
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
