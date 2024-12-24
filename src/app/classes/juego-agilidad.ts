import { Juego } from './juego';

export class JuegoAgilidad extends Juego {
   
    numeroIngresado:number;
    // gano:boolean;
    primerNumero:number;
    segundoNumero:number;
    operador:string;
    resultado:number;
    juegoTerminado:boolean;


    constructor(){
        super();
        this.gano=false;
        this.juegoTerminado=false;
        this.nombre="Agilidad Aritmetica";        
    }
}
