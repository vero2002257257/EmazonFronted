import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainButtonComponent } from './buttons/main-button/main-button.component';
import { InputComponent } from './inputs/inputs.component';
import { LogosComponent } from './logos/logos.component';
import { SelectorComponent } from './selector/selector.component';

 
@NgModule({
  declarations: [
    MainButtonComponent,
    LogosComponent,
    InputComponent,
    SelectorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
   
  ],
  exports: [
    MainButtonComponent,
    LogosComponent,
    InputComponent,
    SelectorComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AtomsModule { }