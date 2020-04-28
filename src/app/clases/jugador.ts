import { Usuario } from './usuario';

export class Jugador extends Usuario{
    
    gano:boolean;
    vidas:number;
    puntos:number;
    puntosTotalesAcum:number;
   constructor(){
       super()
       this.vidas=3;
       this.puntos=0;
       this.puntosTotalesAcum=0;
       this.gano=false;       
   }
    reiniciar(){       
        this.vidas=3;
        this.puntos=0;
        this.gano=false;
    }
    generarNuevo(nombre:string,mail:string,clave:string,sexo:string,juegoJugado:string){
        this.nombre= nombre;
        this.mail= mail;
        this.clave= clave;
        this.sexo= sexo;
        this.juegoJugado=juegoJugado; 
    }
}
