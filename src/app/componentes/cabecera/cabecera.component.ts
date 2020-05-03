import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  @Input() nombreDeUsuarioLogged:string;
  @Input() ocultarLogOut:boolean;
  @Output() logOutUsuario:EventEmitter<any>= new EventEmitter<any>();

  constructor(private router:Router) { 
    this.comprobarUsuarioLogueado();

   }

  ngOnInit() {
  }
  comprobarUsuarioLogueado(){
    var isLogin = localStorage.getItem("isLoggedIn");
    console.log(isLogin);
    if(isLogin=='true'){
      this.nombreDeUsuarioLogged = JSON.parse(localStorage.getItem("usuarioLogueado")).nombre;
      this.ocultarLogOut=false;
    }
    else{
      // this.ocultarLogOut=true;
    }
  }
  logOut(){
    this.ocultarLogOut=true;
    localStorage.removeItem("isLoggedIn");
    localStorage.setItem("isLoggedIn",'false');
    this.logOutUsuario.emit(true);
    this.router.navigate([""]);
  }
}
