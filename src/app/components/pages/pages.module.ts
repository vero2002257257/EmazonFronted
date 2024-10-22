import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { CategoryComponent } from "./category/category.component";
import { TemplatesModule } from "../templates/templates.module";

@NgModule({
    declarations:[
        CategoryComponent
    ],
    imports:[
        CommonModule,
        TemplatesModule,
    ]
})
export class PagesModule{}