import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  status:string="404";
  mensaje:string="Pagina no encontrada";
  
  constructor() { }

  ngOnInit() {
   
  }

}
