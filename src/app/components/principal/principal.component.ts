import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MenuNavComponent } from '../menu-nav/menu-nav.component';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { LoginComponent } from '../login/login.component';
import { RegistroComponent } from '../registro/registro.component';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
  standalone: true,
  imports: [CommonModule, MenuNavComponent, CabeceraComponent, LoginComponent, RegistroComponent,RouterOutlet]
})
export class PrincipalComponent implements OnInit {
  
  seleccionoDeslogue=false;
  isLogged=false;
  usuarioParaCabecera="";
  ocultarLogOutPrincipal:boolean = false;
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
    const usuarioLogueado: any = localStorage.getItem("usuarioLogueado") != null ? localStorage.getItem("usuarioLogueado") : {};
    this.usuarioParaCabecera = JSON.parse(usuarioLogueado).nombre;
    this.isLogged=true;
    this.seleccionoDeslogue = false;
    this.ocultarLogOutPrincipal=false;
  }
}
