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
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  title = 'Create New Product';
  formTitle = 'Fill in the details below to add a new product.';
  isModalOpen = false;
  products: Product[] = [];
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
    this.loadProducts();
  }

  loadBrands(): void {
    this.brandService.getAll().subscribe(
      (brands) => (this.brands = brands),
      (error) => console.error('Error loading brands:', error)
    );
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(
      (categories) => (this.categories = categories),
      (error) => console.error('Error loading categories:', error)
    );
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(
      (products) => (this.products = products),
      (error) => console.error('Error loading products:', error)
    );
  }

  getBrandName(brandId: number): string {
    const brand = this.brands.find((b) => b.id === brandId);
    return brand ? brand.name : 'Unknown';
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  createProduct(product: Product): void {
    this.productService.create(product).subscribe(
      () => {
        console.log('Product created successfully');
        this.loadProducts(); // Refresh the product list
        this.closeModal();
      },
      (error) => console.error('Error creating product:', error)
    );
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
