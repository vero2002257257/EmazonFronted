import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { BrandComponent } from './brand/brand.component';
import { TemplatesModule } from '../templates/templates.module';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { OrganismsModule } from '../organisms/organisms.module'; // Importa el módulo que contiene DataFormComponent

@NgModule({
  declarations: [
    CategoryComponent,
    BrandComponent,
  ],
  imports: [
    CommonModule,
    TemplatesModule,
    MoleculesModule,
    AtomsModule,
    OrganismsModule, // Asegúrate de incluirlo aquí
    
  ]
})
export class PagesModule {}
