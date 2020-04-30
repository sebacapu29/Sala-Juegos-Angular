import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { Jugador } from 'src/app/clases/jugador';
import { DateTimeHelper } from 'src/app/clases/helpers/date-time';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  hide=true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router:Router ) {
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
        if(usuariosLocalStorage!= null && Array.isArray(JSON.parse(usuariosLocalStorage))){     
          this.usuarios = JSON.parse(usuariosLocalStorage);
          console.log("1"); 
          console.log(Array.isArray(usuariosLocalStorage));
        }

        else if(usuariosLocalStorage!= null && !Array.isArray(JSON.parse(usuariosLocalStorage))){          
          // this.usuarios = new Array<any>();
          this.usuarios.push(JSON.parse(usuariosLocalStorage));                        
        }
          
          this.usuarios.push({ "mail" : this.usuarioNuevo.mail, "clave": this.usuarioNuevo.clave,"sexo":this.usuarioNuevo.sexo,"nombre":this.usuarioNuevo.nombre,"puntosTotalesAcum":'0',"fechaActualizacion": DateTimeHelper.getFechaYHora()});
          localStorage.setItem("usuarios",JSON.stringify(this.usuarios));
          console.log(this.usuarioNuevo);            
          alert("Usuario Creado Con Éxito!");       
        }
    }
     else{
       alert("La clave tiene que coincidir con la confirmacion");
     }  
  }
}
