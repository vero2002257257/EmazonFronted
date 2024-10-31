import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '../atoms/atoms.module';
import { SearchInputComponent } from './search-input/search-input.component';
import { ToastComponent } from './toast/toast.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TablesComponent } from './tables/tables.component';
import { MultiSelectorComponent } from './multiselector/multiselector.component';

@NgModule({
  declarations: [
    SearchInputComponent, 
    ToastComponent, 
    TablesComponent, 
    MultiSelectorComponent
  ],
  imports: [
    CommonModule, 
    AtomsModule, 
    ReactiveFormsModule
  ],
  exports: [
    SearchInputComponent, 
    ToastComponent, 
    TablesComponent,
    MultiSelectorComponent
  ],
})
export class MoleculesModule {}
