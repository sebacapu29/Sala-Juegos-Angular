import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  @Input() nombreDeUsuarioLogged:string;
  ocultar=false;
  @Output() logOutUsuario:EventEmitter<any>= new EventEmitter<any>();

  constructor(private router:Router) { 
    this.comprobarUsuarioLogueado();

   }

  ngOnInit() {
  }
  comprobarUsuarioLogueado(){
    var isLogin = localStorage.getItem("isLoggedIn");
    if(isLogin=='true'){
      this.nombreDeUsuarioLogged = JSON.parse(localStorage.getItem("usuarioLogueado")).nombre;
    }
  }
  logOut(){
    localStorage.removeItem("isLoggedIn");
    localStorage.setItem("isLoggedIn",'false');
    this.logOutUsuario.emit(true);
    this.router.navigate([""]);
  }
}
