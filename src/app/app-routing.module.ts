import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/pages/category/category.component';
import { BrandComponent } from './components/pages/brand/brand.component';
 
const routes: Routes = [
  {path: '', component: CategoryComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'brand', component: BrandComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }