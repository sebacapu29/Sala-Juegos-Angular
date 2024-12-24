import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Subscription} from "rxjs";
import { timer } from "rxjs";
import { Usuario } from '../../clases/usuario';
import { LocalStorage } from '../..//clases/helpers/local-storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:true,
  imports:[CommonModule, FormsModule]
})
export class LoginComponent implements OnInit {

  //@ts-ignore
  private subscription: Subscription;
  usuario:Usuario;
  clave= '';
  progreso: number;
  progresoMensaje="esperando..."; 
  logeando=true;
  ProgresoDeAncho:string;
  usuariosEnLocalStorage:any[]=[];
  esUsuarioRegistrado:number=0;
  esUnico:boolean=false;
  @Output() onUsuarioLogueado:EventEmitter<any>= new EventEmitter<any>();
  @Output() onRegistrarUsuario:EventEmitter<any>= new EventEmitter<any>();

  clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar:MatSnackBar) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";      
      this.usuario=new Usuario();
      
      var isLogin = localStorage.getItem("isLoggedIn");
      if(isLogin=='true'){
        router.navigate(['Carousel']);
      }            
  }

  ngOnInit() {
  }
  openSnackBar(mensaje:string){
    this._snackBar.open(mensaje,"Login",{duration:5000});
  }
  Entrar() {


    if (this.esUsuarioRegistrado!=-1) {
      localStorage.setItem("isLoggedIn","true");
      LocalStorage.actualizarUsuarioLogueado(this.esUsuarioRegistrado);   
      this.onUsuarioLogueado.emit(true);  
      this.router.navigate(['Carousel']);
    }
    else{
      //usuario invalido
      this.progreso=0;
      this.ProgresoDeAncho="0%"; 
      this.openSnackBar("Error de usuario o contraseña, problablemente deba registrarse")
    }
  }
  Registrarme() {
      // this.router.navigate(['/Registro']);
      this.onRegistrarUsuario.emit(true);
  }
  MoverBarraDeProgreso() {
    
    this.logeando=false;
    this.clase="progress-bar progress-bar-danger progress-bar-striped active";
    this.progresoMensaje="Iniciando sesión..."; 
    let timerAux = timer.bind(200, 50);
    //@ts-ignore
    this.subscription = timerAux.subscribe(t => {
      this.progreso=this.progreso+1;
      this.ProgresoDeAncho=this.progreso+20+"%";
      switch (this.progreso) {
        case 15:
        this.clase="progress-bar progress-bar-warning progress-bar-striped active";
        this.progresoMensaje="Obteniendo usuarios..";  
        //@ts-ignore
        this.usuariosEnLocalStorage = JSON.parse(localStorage.getItem("usuarios"));          
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
  checkearUsuario():number{
    var indexUsuario=-1;
    if(this.usuariosEnLocalStorage!= undefined){
      if(!Array.isArray(this.usuariosEnLocalStorage)){
        this.esUnico=true; 
        return 0;
      }
      for (let index = 0; index < this.usuariosEnLocalStorage.length; index++) {
        var usuario = this.usuariosEnLocalStorage[index];
        if(usuario["mail"] === this.usuario.mail && usuario["clave"]=== this.usuario.clave){
          indexUsuario=index;
        }
      }
    }

    return indexUsuario;
  }

}
