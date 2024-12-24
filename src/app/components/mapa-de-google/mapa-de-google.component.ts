import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mapa-de-google',
  templateUrl: './mapa-de-google.component.html',
  styleUrls: ['./mapa-de-google.component.css'],
  imports:[CommonModule, FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB6f8x4IjRlesQ3oETc6BXYQHVRTOlY3Ys'
    }),
  ]
})
export class MapaDeGoogleComponent implements OnInit {
  title: string = 'El Primer mapa';
  lat: number = 33.678418;
  lng: number = 5.809007;
  zoom: number = 8;

  mapClicked(e: any) {
    console.log('Mapa clicado:', e);
  }

  constructor() {}

  ngOnInit() {}
}