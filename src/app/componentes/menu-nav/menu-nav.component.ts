import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {

  @Input() ocultarGit:boolean=false;
  @Input() ocultarQuienSoy:boolean=false;
  @Input() ocultarAtras:boolean=true;
  // @Input() isLogin:boolean=false;
  @Input() ocultarOpciones:boolean;
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
