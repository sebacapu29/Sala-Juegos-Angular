import { Juego } from './juego';

export class JuegoAgilidad extends Juego {
   
    numeroIngresado:number=0;
    // gano:boolean;
    primerNumero:number=0;
    segundoNumero:number=0;
    operador:string="";
    resultado:number=0;
    juegoTerminado:boolean;


    constructor(){
        super();
        this.gano=false;
        this.juegoTerminado=false;
        this.nombre="Agilidad Aritmetica";        
    }
}
