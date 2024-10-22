import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { OrganismsModule } from '../organisms/organisms.module';
import { CardFormComponent } from './card-form/card-form.component';
 
@NgModule({
    declarations:[
    CardFormComponent
  ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        AtomsModule,
        MoleculesModule,
        OrganismsModule
    ],
    exports:[CardFormComponent]
})
export class TemplatesModule{ }