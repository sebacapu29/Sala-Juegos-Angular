import { Usuario } from './usuario';

export class Jugador extends Usuario{
    
    gano:boolean;
    vidas:number;
    puntos:number;
    puntosTotalesAcum:number;
   
    reiniciar(){       
        this.vidas=3;
        this.puntos=0;
        this.gano=false;
    }
}
