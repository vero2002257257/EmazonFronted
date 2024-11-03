import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MoleculesModule } from "../molecules/molecules.module";
import { AtomsModule } from "../atoms/atoms.module";
import { CategoryComponent } from "./category/category.component";
import { BrandComponent } from './brand/brand.component';
import { ProductComponent } from './product/product.component';
import { TemplatesModule } from "../templates/templates.module";

@NgModule({
    declarations:[
        CategoryComponent,
        BrandComponent,
        ProductComponent
    ],
    imports:[
        CommonModule,
        MoleculesModule, 
        AtomsModule, 
        TemplatesModule]

})
export class PagesModule{}