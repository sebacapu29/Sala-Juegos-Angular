import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css'],
})
export class MenuCardComponent implements OnInit {

  
  imageBackground:string;
  estadoAnimacion = "estado1";
  imageBackgroundList:string;

  constructor(private route: ActivatedRoute,
    private router: Router) {
      this.imageBackgroundList = "./assets/imagenes/backgroundlist.jpg";
    }

  ngOnInit() {
  }
  Juego(tipo: string) {
    switch (tipo) {
      case 'Adivina':
          this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'Agilidad':
          this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'PPT':
          this.router.navigate(['/Juegos/PPT']);
        break;
      case 'PYR':
          this.router.navigate(['/Juegos/Preguntas']);
        break;
        case 'Anagrama':
          this.router.navigate(['/Juegos/Anagrama']);
        break;
        case 'Tateti':
          this.router.navigate(['/Juegos/Tateti']);
        break;
    }
  }
  animar(){
    this.estadoAnimacion = this.estadoAnimacion==='estado1' ? 'estado2' : 'estado1';
  }
}
