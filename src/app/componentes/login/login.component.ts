import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Subscription} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import { Usuario } from 'src/app/clases/usuario';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  usuario:Usuario;
  clave= '';
  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  ProgresoDeAncho:string;
  usuariosEnLocalStorage:any[];
  esUsuarioRegistrado:boolean;

  clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";      
      this.usuario=new Usuario();
      if(sessionStorage.getItem("isLoggedIn")){        
        this.router.navigate(['/Principal']);     
      }      
  }

  ngOnInit() {
  }

  Entrar() {


    if (this.esUsuarioRegistrado) {
      localStorage.setItem("isLoggedIn","true");
      localStorage.removeItem("usuarioLogueado");      

      localStorage.setItem("usuarioLogueado",JSON.stringify(this.usuario));      
      this.router.navigate(['/Principal']);
    }
    else{
      //usuario invalido
      this.progreso=0;
      this.ProgresoDeAncho="0%"; 
      alert("Error de usuario o contraseña, problablemente deba registrarse");
    }
  }
  Registrarme() {
      this.router.navigate(['/Registro']);
  }
  MoverBarraDeProgreso() {
    
    this.logeando=false;
    this.clase="progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje="Iniciando sesión..."; 
    let timer = TimerObservable.create(200, 50);
    this.subscription = timer.subscribe(t => {
      this.progreso=this.progreso+1;
      this.ProgresoDeAncho=this.progreso+20+"%";
      switch (this.progreso) {
        case 15:
        this.clase="progress-bar progress-bar-warning progress-bar-striped active";
        this.progresoMensaje="Obteniendo usuarios..";  
        this.usuariosEnLocalStorage = JSON.parse(sessionStorage.getItem("usuarios"));          
          break;
        case 30:
          this.clase="progress-bar progress-bar-Info progress-bar-striped active";
          this.progresoMensaje = "Buscando su usuario";
          this.esUsuarioRegistrado = this.checkearUsuario();           
          break;
          case 60:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          break;
          case 75:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          break;
          case 85:
          this.clase="progress-bar progress-bar-success progress-bar-striped active";
          break;
          
        case 100:
          this.progresoMensaje="Completado!";
          this.subscription.unsubscribe();
          this.Entrar();
          break;
      }     
    });
  }
  checkearUsuario():boolean{
    var existe=false;
    if(this.usuariosEnLocalStorage!= undefined){
      for (let index = 0; index < this.usuariosEnLocalStorage.length; index++) {
        var usuario = this.usuariosEnLocalStorage[index];
        if(usuario["mail"] === this.usuario.mail && usuario["clave"]=== this.usuario.clave){
          existe=true;
        }
      }
    }
    return existe;
  }

}
