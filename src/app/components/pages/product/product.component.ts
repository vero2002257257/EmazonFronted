import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../core/services/brand/brand.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { ProductService } from '../../../core/services/product/product.service';
import { Brand } from '../../../core/models/brand-model';
import { Category } from '../../../core/models/category.models';
import { Product } from '../../../core/models/product.models';
import { firstValueFrom, of } from 'rxjs';

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

  async loadBrands(): Promise<void> {
    try {
      this.brands = await firstValueFrom(this.brandService.getAll() || of([]));
    } catch (error) {
      console.error('Error loading brands:', error);
    }
  }

  async loadCategories(): Promise<void> {
    try {
      this.categories = await firstValueFrom(this.categoryService.getAll() || of([]));
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  }

  async createProduct(product: Product): Promise<void> {
    console.log('Product received:', product);
    try {
      await firstValueFrom(this.productService.create(product) || of(null));
      console.log('Product created successfully');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }
}
