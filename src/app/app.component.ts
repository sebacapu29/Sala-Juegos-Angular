import { Component } from '@angular/core';
import {PrincipalComponent } from './components/principal/principal.component';

@Component({
  selector: 'app-root',
  imports: [PrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-sala-juegos';
}
