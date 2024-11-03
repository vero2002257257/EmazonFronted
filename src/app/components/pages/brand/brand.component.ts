import { Component, OnInit, ViewChild } from '@angular/core';
import { DataFormComponent } from '../../organisms/data-form/data-form.component';
import { BrandService } from '../../../core/services/brand/brand.service';
import { Brand } from '../../../core/models/brand-model';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
})
export class BrandComponent implements OnInit {
  @ViewChild(DataFormComponent) dataFormComponent!: DataFormComponent;

  title = 'Create New Brand';
  formTitle =
    'Create a Brand for your e-commerce to organize brands into groups.';
  brands: Brand[] = [];
  currentPage: number = 0;
  pageSize: number = 7;
  hasNextPage: boolean = true;
  sortField: string = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';

  constructor(private BrandService: BrandService) {}

  ngOnInit(): void {
    this.loadbrands();
  }

  handleSubmit(formData: Brand): void {
    this.BrandService.create(formData).subscribe({
      next: () => {
        this.brands = [{ ...formData }, ...this.brands];
        this.dataFormComponent.resetForm();
      },
      error: () => {
        // Manejar el error si es necesario
      },
    });
  }

  loadbrands(): void {
    this.BrandService.getBrandsPaged(
      this.currentPage,
      this.pageSize,
      this.sortField,
      this.sortOrder
    ).subscribe((response) => {
      this.brands = response.content;
      this.hasNextPage = this.currentPage < response.totalPages - 1;
    });
  }

  sort(value: string): void {
    const [sortField, sortOrder] = value.split(',');
    this.sortField = sortField;
    this.sortOrder = sortOrder as 'asc' | 'desc';
    this.loadbrands();
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
      this.loadbrands();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadbrands();
    }
  }

  onSearch(query: string): void {
    if (query) {
      this.brands = this.brands.filter(
        (Brand) =>
          Brand.name.toLowerCase().includes(query.toLowerCase()) ||
          Brand.description.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.loadbrands();
    }
  }
}
