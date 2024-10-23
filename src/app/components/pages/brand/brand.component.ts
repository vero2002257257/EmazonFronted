import { Component, OnInit, ViewChild } from '@angular/core';
import { DataFormComponent } from '../../organisms/data-form/data-form.component';
import { BrandService } from '../../../core/services/brand/brand.service';
import { Brand } from '../../../core/models/brand-model';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  @ViewChild(DataFormComponent) dataFormComponent!: DataFormComponent;

  title = 'Create New Brand';
  formTitle = 'Create a Brand for your e-commerce to organize brands into groups.';
  
  constructor(private BrandService: BrandService) {}

  ngOnInit(): void {}

  handleSubmit(formData: Brand): void {
    this.BrandService.create(formData).subscribe({
      next: () => {
        this.dataFormComponent.resetForm();
      },
      error: () => {
        // Manejar el error si es necesario
      }
    });
  }

  
}