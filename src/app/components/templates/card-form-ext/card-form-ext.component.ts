import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Brand } from '../../../core/models/brand-model';
import { Category } from '../../../core/models/category.models';
import { Product } from '../../../core/models/product.models';

@Component({
  selector: 'app-card-form-ext',
  templateUrl: './card-form-ext.component.html',
  styleUrls: ['./card-form-ext.component.scss']
})
export class CardFormExtComponent {
  @Input() title: string = 'Create New Product';
  @Input() formTitle: string = 'Fill in the details below to add a new product.';
  @Input() brands: Brand[] = [];
  @Input() categories: Category[] = [];
  @Output() submitForm = new EventEmitter<Product>();

  onFormSubmit(product: Product) {
    console.log('Product:', product);
    this.submitForm.emit(product);
  }
}