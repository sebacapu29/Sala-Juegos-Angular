import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
// import {MatLabel } from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports:[CommonModule,
    MatSnackBarModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule]
})
export class MaterialModule { }
