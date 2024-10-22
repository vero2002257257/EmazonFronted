import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FooterComponent } from "./components/footer/footer.component";
import { PageComponent } from "./components/page/page.component";
import { AtomsModule } from "../components/atoms/atoms.module";
import { MoleculesModule } from "../components/molecules/molecules.module";
import { OrganismsModule } from "../components/organisms/organisms.module";
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { TemplatesModule } from "../components/templates/templates.module";
import { PagesModule } from "../components/pages/pages.module";

@NgModule({
    declarations:[
        PageComponent,
        FooterComponent,
        HeaderComponent
    ],

    imports:[
        RouterModule,
        CommonModule,
        AtomsModule,
        MoleculesModule,
        OrganismsModule,
        TemplatesModule,
        PagesModule


    ],
    exports:[
        PageComponent,
        FooterComponent,
        HeaderComponent
    ]
})

export class CoreModule{}