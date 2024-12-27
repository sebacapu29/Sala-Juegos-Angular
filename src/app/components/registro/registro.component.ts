import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from '../../classes/usuario';
import { Jugador } from '../../classes/jugador';
import { DateTimeHelper } from '../../classes/helpers/date-time';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone:true,
  imports:[CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatRadioModule, MatIconModule, MatInputModule]
})
export class RegistroComponent implements OnInit {


  usuarioNuevo:Jugador;
  usuarios:any[];
  confirmacionClave:string="";
  //@ts-ignore
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  hide=true;
  hide2=true;
  email = new FormControl('', [Validators.required, Validators.email]);
  @Output() onRegistroCompletado:EventEmitter<any>= new EventEmitter<any>();
  
  constructor(private router:Router,
    private _snackBar:MatSnackBar ) {
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
      if(confirm("Esta Seguro?")){
        var usuariosLocalStorage = localStorage.getItem("usuarios");        
        localStorage.removeItem("usuarios");
        if(usuariosLocalStorage!= null && Array.isArray(JSON.parse(usuariosLocalStorage))){     
          this.usuarios = JSON.parse(usuariosLocalStorage);
        }

        else if(usuariosLocalStorage!= null && !Array.isArray(JSON.parse(usuariosLocalStorage))){                 
          this.usuarios.push(JSON.parse(usuariosLocalStorage));                        
        }
          
          this.usuarios.push({ "mail" : this.usuarioNuevo.mail, "clave": this.usuarioNuevo.clave,"sexo":this.usuarioNuevo.sexo,"nombre":this.usuarioNuevo.nombre,"puntosTotalesAcum":'0',"fechaActualizacion": DateTimeHelper.getFechaYHora()});
          localStorage.setItem("usuarios",JSON.stringify(this.usuarios));
     
          this.onRegistroCompletado.emit(true); 
          this.openSnackBar("Usuario Creado Con Éxito!");           
        }
    }
     else{
      this.openSnackBar("La clave tiene que coincidir con la confirmacion");  
     }  
  }
  openSnackBar(mensaje:string){
    this._snackBar.open(mensaje,"Juego",{duration:5000});
  }
  cancelar(){
    this.onRegistroCompletado.emit(true);
  }
}
