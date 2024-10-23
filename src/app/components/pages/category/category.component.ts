import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { Category } from '../../../core/models/category.models';
import { DataFormComponent } from '../../organisms/data-form/data-form.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @ViewChild(DataFormComponent) dataFormComponent!: DataFormComponent;

  title = 'Create New Category';
  formTitle = 'Create a category for your e-commerce to organize products into groups.'; 
  categories: Category[] = [];
  currentPage: number = 0;
  pageSize: number = 7;
  hasNextPage: boolean = true;
  sortField: string = 'name';
  sortOrder: 'asc' | 'desc' = 'asc';


  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  handleSubmit(formData: Category): void {
    this.categoryService.create(formData).subscribe({
      next: () => {
        this.categories = [{ ...formData }, ...this.categories];
        this.dataFormComponent.resetForm(); 
      },
      error: () => {

      }
    });
  }
  loadCategories(): void {
    this.categoryService.getCategoriesPaged(this.currentPage, this.pageSize, this.sortField, this.sortOrder)
      .subscribe(response => {
        this.categories = response.content;
        this.hasNextPage = this.currentPage < response.totalPages - 1;
      });
  }

  sort(value: string): void {
    const [sortField, sortOrder] = value.split(',');
    this.sortField = sortField;
    this.sortOrder = sortOrder as 'asc' | 'desc';
    this.loadCategories();
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
      this.loadCategories();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadCategories();
    }
  }

  onSearch(query: string): void {
    
    if (query) {
      this.categories = this.categories.filter(category => 
        category.name.toLowerCase().includes(query.toLowerCase()) ||
        category.description.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      this.loadCategories();
    }
  }
  

}
