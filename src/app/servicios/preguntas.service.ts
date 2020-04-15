import { Injectable } from '@angular/core';
import { MiHttpService } from './mi-http/mi-http.service';
import { Preguntas } from '../clases/preguntas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {

  constructor(public miHttp: MiHttpService ) { }
  private _jsonURL = './assets/data/qna.json';
  private _jsonURLCuriosidades = './assets/data/curiosidades.json';
  preguntas:Preguntas[] = new Array<Preguntas>();

  getPreguntasYRespuestas():Observable<any>{

    return this.miHttp.httpGetO2(this._jsonURL);
  }
  getCuriosidades():Observable<any>{

    return this.miHttp.httpGetO2(this._jsonURLCuriosidades);    
  }
}
