import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  
  seleccionoDeslogue=false;
  isLogged=false;
  usuarioParaCabecera="";
  constructor(private router:Router) { 

    var isLogin = localStorage.getItem("isLoggedIn");
  
    if(isLogin=='true'){
      this.isLogged =true;
    } 
    else{
      this.seleccionoDeslogue = true;
    }
   }
  ngOnInit() {
  }
  tomarDeslogueo(estadoLogueo:boolean){
    this.seleccionoDeslogue = estadoLogueo;
    this.isLogged=false;
    this.usuarioParaCabecera="";
  }
  tomarLogueo(estadoLogueo:boolean){
    this.usuarioParaCabecera = JSON.parse(localStorage.getItem("usuarioLogueado")).nombre;
    this.isLogged=estadoLogueo;
    this.seleccionoDeslogue = false;
  }
}
