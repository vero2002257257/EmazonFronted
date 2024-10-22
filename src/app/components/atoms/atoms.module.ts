import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainButtonComponent } from './buttons/main-button/main-button.component';
import { InputsComponent } from './inputs/inputs.component';
import { LogosComponent } from './logos/logos.component';

 
@NgModule({
  declarations: [
    MainButtonComponent,
    LogosComponent,
    InputsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
   
  ],
  exports: [
    MainButtonComponent,
    LogosComponent,
    InputsComponent
  ],
})
export class AtomsModule { }