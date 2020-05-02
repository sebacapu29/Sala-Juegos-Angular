import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/clases/jugador';
import { JuegoAnagrama } from 'src/app/clases/juego-anagrama';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  jugador:Jugador;
  nuevoJuego:JuegoAnagrama;
  contadorTiempo=0;
  
  constructor() {
    var usuarioLocalStorage:any;

    if(localStorage.getItem("usuarioLogueado")!=null){
      usuarioLocalStorage = JSON.parse(localStorage.getItem("usuarioLogueado"));              
    } 
    this.nuevoJuego= new JuegoAnagrama();   
    this.jugador = new Jugador(usuarioLocalStorage.nombre,usuarioLocalStorage.mail,usuarioLocalStorage.clave,usuarioLocalStorage.sexo,"Ta Te ti"); 
    this.nuevoJuego.jugador = this.jugador.mail;
    
    this.jugador.puntosTotalesAcum = usuarioLocalStorage.puntosTotalesAcum; 
    this.jugador.fechaActualizacion = usuarioLocalStorage.fechaActualizacion;
   }

  ngOnInit(): void {
    
  }

}
