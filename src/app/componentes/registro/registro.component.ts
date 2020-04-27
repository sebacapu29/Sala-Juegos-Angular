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
          console.log("2");
          console.log(Array.isArray(usuariosLocalStorage));     
        }
          this.usuarios.push({ "mail" : this.usuarioNuevo.mail, "clave": this.usuarioNuevo.clave,"sexo":this.usuarioNuevo.sexo,"nombre":this.usuarioNuevo.nombre,"puntosTotalesAcum":'0'});
          localStorage.setItem("usuarios",JSON.stringify(this.usuarios));            
        alert("Usuario Creado Con Éxito!");
        // console.log(Array.isArray());     
        // this.router.navigate(['Login']);
        }
    }
     else{
       alert("La clave tiene que coincidir con la confirmacion");
     }  
    //  console.log(localStorage.getItem("usuarios"));
  }
}
