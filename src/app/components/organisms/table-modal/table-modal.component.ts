import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { BrandService } from '../../../core/services/brand/brand.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { ProductService } from '../../../core/services/product/product.service';
import { Product } from '../../../core/models/product.models';
import { Brand } from '../../../core/models/brand-model';
import { Category } from '../../../core/models/category.models';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.scss']
})
export class TableModalComponent implements OnInit {
  @Input() products: Product[] = [];
  @Output() closeModalEvent = new EventEmitter<void>();
  brands: Brand[] = [];
  categories: Category[] = [];
  currentPage = 0;
  pageSize = 5; // Tamaño de página definido, puedes ajustar el valor según lo necesites
  itemsPerPage = 5;
  paginatedProducts: Product[] = [];
  totalItems = 0;
  sortOrder: 'asc' | 'desc' = 'asc';
  sortBy: 'name' | 'brand' | 'category' = 'name';
  sortField: string = 'name'; // Campo por defecto para ordenación  

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
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.paginateData();
    }
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
  private paginateData(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = this.products.slice(start, end);
  }
  onPageChange(page: number): void {
    if (page >= 0 && page < this.getTotalPages()) {
      this.currentPage = page;
      this.paginateData();
    }
  }
  getTotalPages(): number {
    return Math.ceil(this.products.length / this.pageSize);
  }

  changeSortOrder(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortOrder = target.value as 'asc' | 'desc';
    this.sortData();
  }

  changeSortBy(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.sortField = target.value;
    this.sortData();
  }
  private sortData(): void {
    this.products.sort((a, b) => {
      let valueA: string = '';
      let valueB: string = '';
  
      if (this.sortField === 'brand') {
        valueA = this.getBrandName(a.brandId).toLowerCase();
        valueB = this.getBrandName(b.brandId).toLowerCase();
      } else if (this.sortField === 'category') {
        valueA = this.getCategoryNames(a.categoryIds).toLowerCase();
        valueB = this.getCategoryNames(b.categoryIds).toLowerCase();
      } else {
        valueA = (a[this.sortField as keyof Product] as unknown as string)?.toString().toLowerCase() ?? '';
        valueB = (b[this.sortField as keyof Product] as unknown as string)?.toString().toLowerCase() ?? '';
      }
  
      if (valueA < valueB) {
        return this.sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    this.paginateData(); // Llama a paginateData después de ordenar
  }
  loadProducts(): void {
    this.productService.getPaginated(this.currentPage, this.itemsPerPage, this.sortBy, this.sortOrder).subscribe(
      (response) => {
        this.products = response;
        this.totalItems = response.length; // Actualiza esto según la respuesta del backend
      },
      (error) => console.error('Error loading products:', error)
    );
  }
  getBrandName(brandId: number): string {
    const brand = this.brands.find(b => b.id === brandId);
    return brand ? brand.name : 'Unknown';
  }
  
  getCategoryNames(categoryIds: number[]): string {
    if (!categoryIds || categoryIds.length === 0) return 'Unknown';
    return categoryIds
      .map(id => {
        const category = this.categories.find(c => c.id === id);
        return category ? category.name : 'Unknown';
      })
      .join(', ');
  }
  closeModal(): void {
    this.closeModalEvent.emit();
  }
}