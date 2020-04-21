import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  nombreDeUsuarioLogged:string;
  
  constructor(private router:Router) {
    this.nombreDeUsuarioLogged = localStorage.getItem("usuarioLogueado");
   }

  ngOnInit() {
  }
  logOut(){
    sessionStorage.removeItem("isLoggedIn");
    this.router.navigate(["Login"])
  }
}
