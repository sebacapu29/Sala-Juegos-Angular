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
  ocultarLogOutPrincipal:boolean;
  registro=false;

  constructor(private router:Router) { 

    var isLogin = localStorage.getItem("isLoggedIn");

    if(isLogin=='true'){
     this.tomarLogueo(true);
      this.isLogged =true;
    } 
    else{
      this.seleccionoDeslogue = true;
    }
   }
   tomarParaRegistro(e:boolean){
     this.registro=e;
   }
  ngOnInit() {
  }
  tomarRegistro(registroCompletado:boolean){
    
      this.registro=false;
  }
  tomarDeslogueo(estadoLogueo:boolean){
    this.seleccionoDeslogue = estadoLogueo;
    this.isLogged=false;
    this.ocultarLogOutPrincipal=true;
    this.usuarioParaCabecera="";
  }
  tomarLogueo(estadoLogueo:boolean){
    this.usuarioParaCabecera = JSON.parse(localStorage.getItem("usuarioLogueado")).nombre;
    this.isLogged=true;
    this.seleccionoDeslogue = false;
    this.ocultarLogOutPrincipal=false;
  }
}
