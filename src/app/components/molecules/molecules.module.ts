import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '../atoms/atoms.module';
import { SearchInputComponent } from './search-input/search-input.component';
import { ToastComponent } from './toast/toast.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TablesComponent } from './tables/tables.component';

@NgModule({
  declarations: [SearchInputComponent, ToastComponent, TablesComponent],
  imports: [CommonModule, AtomsModule, ReactiveFormsModule],
  exports: [SearchInputComponent, ToastComponent, TablesComponent],
})
export class MoleculesModule {}
