import { Usuario } from '../usuario';
import { Jugador } from '../jugador';
import { DateTimeHelper } from './date-time';

export class LocalStorage {

    static obtenerIndexUsuarioLogueado():number{
        var usuarioLogueadoEnJuego:any;
        var usuariosEnLocalStorage:any;

        if(localStorage.getItem("usuarioLogueado")!=null){
          //@ts-ignore
          usuarioLogueadoEnJuego = JSON.parse(localStorage.getItem("usuarioLogueado"));              
        }
        if(localStorage.getItem("usuarios")!=null){
          //@ts-ignore
          usuariosEnLocalStorage = <Array<any>> JSON.parse(localStorage.getItem("usuarios"));              
        }
        if(usuariosEnLocalStorage!= undefined){      
          for (let index = 0; index <= usuariosEnLocalStorage.length; index++) {
            var usuario = usuariosEnLocalStorage[index];
            
            
            if(usuario["mail"] ===  usuarioLogueadoEnJuego["mail"]){                    
              return index;     
            }
          }
        }
        return -1;
      }
      static actualizarUsuarioLogueado(index:number){
        localStorage.removeItem("usuarioLogueado");  
        //@ts-ignore
        var usuarioLogueado = JSON.parse(localStorage.getItem("usuarios"))[index]; 
        localStorage.setItem("usuarioLogueado",JSON.stringify(usuarioLogueado)); 
      }

      static actualizarUnUsuario(usuario:Jugador,index:number,puntosAcum?:number){       
        var usuarioDatos = { "mail" : usuario.mail, "clave": usuario.clave,"sexo":usuario.sexo,"nombre":usuario.nombre,"puntosTotalesAcum":usuario.puntosTotalesAcum,"fechaActualizacion": DateTimeHelper.getFechaYHora()};
        //@ts-ignore
        var usuariosEnLocalStorage = <Array<any>> JSON.parse(localStorage.getItem("usuarios")); 
        if(Array.isArray(usuariosEnLocalStorage)){   
            usuariosEnLocalStorage[index] = usuarioDatos;
        }
         localStorage.removeItem("usuarios");
         localStorage.setItem("usuarios",JSON.stringify(usuariosEnLocalStorage));
         LocalStorage.actualizarUsuarioLogueado(index);
      }
}
