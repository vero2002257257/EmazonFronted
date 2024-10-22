
 
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { AtomsModule } from "../atoms/atoms.module";
import { SearchInputComponent } from "./search-input/search-input.component";
import { ToastComponent } from './toast/toast.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations:[
        SearchInputComponent,
        ToastComponent,
    ],
    imports:[
        CommonModule,
        AtomsModule,
        ReactiveFormsModule
    ],
    exports:[
        SearchInputComponent,
        ToastComponent
    ]
})
export class MoleculesModule{}