import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RuteandoModule } from './modules/ruteando/ruteando.module';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/ruteando/ruteando.module').then(m => m.RuteandoModule) } // Lazy Loading
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }