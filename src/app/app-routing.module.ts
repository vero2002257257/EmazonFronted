import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/pages/category/category.component';
import { BrandComponent } from './components/pages/brand/brand.component';
import { ProductComponent } from './components/pages/product/product.component';
 
const routes: Routes = [
  {path: '', component: CategoryComponent},
  {path: 'category', component: CategoryComponent},
  {path: 'brand', component: BrandComponent},
  {path: 'product', component: ProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }