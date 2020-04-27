import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { Jugador } from 'src/app/clases/jugador';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/
  usuarioNuevo:Jugador;
  usuarios:any[];
  confirmacionClave:string;

  constructor( ) {
    this.usuarioNuevo= new Jugador();
    this.usuarios = new Array<any>();
   }

  ngOnInit() {
  }
  registrar(){
    if(this.usuarioNuevo.clave === undefined || this.usuarioNuevo.mail === undefined){
      alert("Complete los campos antes de registrar");
      return;
    }
    if(this.usuarioNuevo.clave == this.confirmacionClave){
      if(confirm("esta seguro?")){
        var usuariosLocalStorage = localStorage.getItem("usuarios");        
        localStorage.removeItem("usuarios");
        if(usuariosLocalStorage!= null){     
          this.usuarios = JSON.parse(usuariosLocalStorage);
        }
          this.usuarios.push({ "mail" : this.usuarioNuevo.mail, "clave": this.usuarioNuevo.clave,"sexo":this.usuarioNuevo.sexo,"nombre":this.usuarioNuevo.nombre,"puntosAcum":'0'});
          localStorage.setItem("usuarios",JSON.stringify(this.usuarios));            
        alert("Usuario Creado Con Éxito!");
        }
    }
     else{
       alert("La clave tiene que coincidir con la confirmacion");
     }  
     console.log(localStorage.getItem("usuarios"));
  }
}
