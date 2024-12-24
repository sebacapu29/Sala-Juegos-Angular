import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http/mi-http.service'; 
@Injectable()
export class PaisesService {

  constructor(public miHttp: MiHttpService ) { }


  public listar():Promise<Array<any>> {
       return   this.miHttp.httpGetP("https://restcountries.eu/rest/v2/all")
       //@ts-ignore
          .then( data => {
            console.log( data );
            return data;
          })
          //@ts-ignore
          .catch( err => {
            console.log( err );
            return null;
          });
          //return null;
    }
}
