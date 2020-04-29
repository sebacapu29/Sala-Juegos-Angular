export class Juego {
  public nombre = 'S/N';
  public jugador: string='S/N';
  public gano = false;

  constructor(nombre?: string, gano?: boolean,jugador?:string) {
    if (nombre)
      this.nombre = nombre;

    if (gano)
      this.gano = gano;
    if(jugador)
      this.jugador=jugador;
    else
      this.jugador= "natalia natalia";
  }
  actualizarDatosJuegos(){
  
    var juegosEnLocalStorage:any = new Array<any>();
    var usuarioLogueadoEnJuego:any;

    if(localStorage.getItem("juegos")!=null){
      juegosEnLocalStorage = <Array<any>> JSON.parse(localStorage.getItem("juegos"));              

    }
   
    var juegoAGuardar= {"juego":this.jugador,"jugador":this.nombre,"gano":this.gano};
    localStorage.removeItem("juegos");
    juegosEnLocalStorage.push(juegoAGuardar);
    localStorage.setItem("juegos",JSON.stringify(juegosEnLocalStorage));
  }
}
