import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PrincipalComponent } from './componentes/principal/principal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, PrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp-sala-juegos';
}
