import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { DataFormComponent } from './data-form/data-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations:[DataFormComponent],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        MoleculesModule,
        AtomsModule
    ],
    exports:[DataFormComponent]
})
export class OrganismsModule{}