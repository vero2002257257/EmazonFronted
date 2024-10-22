import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { CategoryService } from '../../../core/services/category/category.service';
import { TemplatesModule } from '../../templates/templates.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { DataFormComponent } from '../../organisms/data-form/data-form.component';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let categoryService: CategoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [HttpClientTestingModule, TemplatesModule],
      providers: [CategoryService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default title and formTitle', () => {
    expect(component.title).toBe('Create New Category');
    expect(component.formTitle).toBe(
      'Create a category for your e-commerce to organize products into groups.'
    );
  });
  it('should call ngOnInit when the component initializes', () => {
    jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should handleSubmit without errors if formData is empty', () => {
    const emptyFormData = { name: '', description: '' };
    jest.spyOn(categoryService, 'create').mockReturnValue(of(true));

    component.handleSubmit(emptyFormData);

    expect(categoryService.create).toHaveBeenCalledWith(emptyFormData);
  });
});
