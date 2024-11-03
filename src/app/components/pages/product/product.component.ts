import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../core/services/brand/brand.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { ProductService } from '../../../core/services/product/product.service';
import { Brand } from '../../../core/models/brand-model';
import { Category } from '../../../core/models/category.models';
import { Product } from '../../../core/models/product.models';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  title = 'Create New Product';
  formTitle = 'Fill in the details below to add a new product.';
  brands: Brand[] = [];
  categories: Category[] = [];

  constructor(
    private brandService: BrandService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadBrands();
    this.loadCategories();
  }

  loadBrands(): void {
    this.brandService.getAll().subscribe({
      next: (brands) => this.brands = brands,
      error: (error) => console.error('Error loading brands:', error)
    });
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => this.categories = categories,
      error: (error) => console.error('Error loading categories:', error)
    });
  }

  createProduct(product: Product): void {
    console.log('Product received:', product);
    this.productService.create(product).subscribe({
      next: () => {
        console.log('Product created successfully');
        // Handle successful product creation (e.g., show a success message)
      },
      error: (error) => {
        // Handle error during product creation (e.g., show an error message)
        console.error('Error creating product:', error);
      }
    });
  }
}