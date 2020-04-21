import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
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
  usuarioNuevo:Usuario;
  usuarios:any[];
  confirmacionClave:string;

  constructor( ) {
    this.usuarioNuevo= new Usuario();
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
        var usuariosLocalStorage = sessionStorage.getItem("usuarios");
        sessionStorage.removeItem("usuarios");
        if(usuariosLocalStorage!= null){     
          this.usuarios = JSON.parse(usuariosLocalStorage);
        }
          this.usuarios.push({ "mail" : this.usuarioNuevo.mail, "clave": this.usuarioNuevo.clave});
          sessionStorage.setItem("usuarios",JSON.stringify(this.usuarios));            
        alert("Usuario Creado Con Éxito!");
        }
    }
     else{
       alert("La clave tiene que coincidir con la confirmacion");
     }  
  }
}
