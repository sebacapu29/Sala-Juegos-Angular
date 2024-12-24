import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css'],
  imports:[RouterOutlet, CommonModule]
})
export class JuegosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
