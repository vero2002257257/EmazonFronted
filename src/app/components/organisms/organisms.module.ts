import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '../atoms/atoms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { DataFormComponent } from './data-form/data-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDfComponent } from './product-df/product-df.component';
import { DataFormExtComponent } from './data-form-ext/data-form-ext.component';

@NgModule({
    declarations:[DataFormComponent, ProductDfComponent, DataFormExtComponent],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        MoleculesModule,
        AtomsModule,
        FormsModule
    ],
    exports:[DataFormComponent, ProductDfComponent]
})
export class OrganismsModule{}