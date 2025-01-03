import { Component, Injectable } from '@angular/core';
import { MiHttpService } from './mi-http/mi-http.service'; 

@Component({
  template: '<p></p>',
  providers:[MiHttpService]
})


@Injectable()
export class ArchivosJugadoresService {

  api="http://localhost:4200/jugadoresarchivo/apirestjugadores/";
  peticion:any;
  constructor( public miHttp: MiHttpService ) {
    
  }


  public traerJugadores(ruta:string) {
    return this.miHttp.httpGetO(this.api+ruta)
    .toPromise()
    .then( data => {
      console.log("Archivo jugadores");
     console.log( data );
      return data;
    }, err => {
      console.log( err );
    })
 

  
  }



}
