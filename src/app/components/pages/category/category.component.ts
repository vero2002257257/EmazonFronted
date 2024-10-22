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

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {}

  handleSubmit(formData: Category): void {
    this.categoryService.create(formData).subscribe({
      next: () => {
        this.dataFormComponent.resetForm(); 
      },
      error: () => {

      }
    });
  }
}
