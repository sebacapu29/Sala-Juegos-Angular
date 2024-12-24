import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RuteandoModule } from '../../modules/ruteando/ruteando.module';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css'],
  standalone: true,
  imports:[CommonModule, NgbCollapseModule, RouterModule, RuteandoModule] 
})
export class MenuNavComponent implements OnInit {

  @Input() ocultarGit:boolean=false;
  @Input() ocultarQuienSoy:boolean=false;
  @Input() ocultarAtras:boolean=true;
  @Input() ocultarOpciones:boolean=false;

  public isMenuCollapsed = true;
  public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  
  constructor() {
       
   }

  ngOnInit(): void {
  }

}
