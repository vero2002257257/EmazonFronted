import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { OrganismsModule } from '../organisms/organisms.module';
import { CardFormComponent } from './card-form/card-form.component';
import { CardFormExtComponent } from './card-form-ext/card-form-ext.component';

@NgModule({
    declarations:[
    CardFormComponent,
    CardFormExtComponent
  ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        AtomsModule,
        MoleculesModule,
        OrganismsModule
    ],
    exports:[CardFormComponent, CardFormExtComponent],

})
export class TemplatesModule{ }