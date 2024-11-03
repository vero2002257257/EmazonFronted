import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '../atoms/atoms.module';
import { FormsModule } from '@angular/forms';
import { MoleculesModule } from '../molecules/molecules.module';
import { DataFormComponent } from './data-form/data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataFormExtComponent } from './data-form-ext/data-form-ext.component';

@NgModule({
    declarations:[DataFormComponent, DataFormExtComponent],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        MoleculesModule,
        AtomsModule,
        FormsModule
    ],
    exports:[DataFormComponent,  DataFormExtComponent],

})
export class OrganismsModule{}