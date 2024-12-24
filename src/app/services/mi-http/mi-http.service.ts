import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // Esto hace que el servicio esté disponible de manera global
})
export class MiHttpService {
  constructor(private httpClient: HttpClient) {}

  // Método para obtener datos utiliSzando una promesa
  public httpGetP(url: string): Promise<any> {
    return this.httpClient
      .get(url)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Método para realizar un POST y retornar la respuesta en un observable
  public httpPostP(url: string, objeto: any): Observable<any> {
    return this.httpClient.post(url, objeto).pipe(
      map((data) => {
        console.log(data);
        return data;
      }),
      catchError(this.handleError)
    );
  }

  // Método para obtener datos como un observable
  public httpGetO(url: string): Observable<any> {
    return this.httpClient.get(url).pipe(
      map((res) => res), // Transformar datos si es necesario
      catchError(this.handleError)
    );
  }

  // Otro ejemplo de método GET con un tipo específico de datos
  public httpGetO2<T>(url: string): Observable<T[]> {
    return this.httpClient.get<T[]>(url).pipe(catchError(this.handleError));
  }

  // Extraer datos de la respuesta (útil para promesas)
  private extractData(res: any): any {
    return res || {};
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}