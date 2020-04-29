import { Usuario } from './usuario';

export class Jugador extends Usuario{
    
    gano:boolean;
    vidas:number;
    puntos:number;
    puntosTotalesAcum:number;
   constructor(nombre?:string,mail?:string,clave?:string,sexo?:string,juegoJugado?:string,
                vidas?:number,puntos?:number,puntosTotalesAcum?:number){
       super()
       this.nombre= nombre? nombre:"";
       this.mail= mail? mail:"";
       this.clave= clave? clave: "";
       this.sexo= sexo ? sexo: "";
       this.juegoJugado=juegoJugado? juegoJugado:"";

       this.vidas= vidas? vidas : 3;
       this.puntos= puntos? puntos : 0;
       this.puntosTotalesAcum= puntosTotalesAcum? puntosTotalesAcum : 0;
       this.gano= false;       
   }
    reiniciar(){       
        this.vidas=3;
        this.puntos=0;
        this.gano=false;
    }
}
