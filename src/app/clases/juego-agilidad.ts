export class JuegoAgilidad {
    numeroIngresado:number;
    gano:boolean;
    primerNumero:number;
    segundoNumero:number;
    operador:string;
    resultado:number;
    juegoTerminado:boolean;

    constructor(){
        this.gano=false;
        this.juegoTerminado=false;
    }
}
