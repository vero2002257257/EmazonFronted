import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CategoryComponent } from "./category/category.component";
import { TemplatesModule } from "../templates/templates.module";
import { MoleculesModule } from "../molecules/molecules.module";
import { AtomsModule } from "../atoms/atoms.module";

@NgModule({
    declarations:[
        CategoryComponent
    ],
    imports:[
        CommonModule,
        TemplatesModule,
        MoleculesModule,
        AtomsModule,
    ]
})
export class PagesModule{}