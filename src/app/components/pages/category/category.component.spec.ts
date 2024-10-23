import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { CategoryService } from '../../../core/services/category/category.service';
import { TemplatesModule } from '../../templates/templates.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { DataFormComponent } from '../../organisms/data-form/data-form.component';
import { Category } from '../../../core/models/category.models';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  let categoryService: CategoryService;
  let mockCategoryService: any;

  beforeEach(async () => {
    mockCategoryService = {
      getCategoriesPaged: jest.fn(),
      create: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [CategoryComponent],
      imports: [HttpClientTestingModule, TemplatesModule],
      providers: [{ provide: CategoryService, useValue: mockCategoryService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;

    // Mocking the response of getCategoriesPaged
    mockCategoryService.getCategoriesPaged.mockReturnValue(
      of({
        content: [{ name: 'Books', description: 'Various books' }],
        totalPages: 1,
      })
    );

    fixture.detectChanges(); // Triggers ngOnInit
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

  it('should call ngOnInit and load categories', () => {
    jest.spyOn(component, 'loadCategories');
    component.ngOnInit();
    expect(component.loadCategories).toHaveBeenCalled();
  });
  it('should load categories correctly', () => {
    component.loadCategories();
    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalledWith(0, component.pageSize, component.sortField, component.sortOrder);
    expect(component.categories.length).toBe(1);
    expect(component.hasNextPage).toBe(false); // Based on the mock response
  });

  
  it('should navigate to the next page', () => {
    component.currentPage = 0; // Reset current page for the test
    component.hasNextPage = true; // Allow next page
    component.nextPage();
    expect(component.currentPage).toBe(1);
    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalled(); // Ensure categories are reloaded
  });

  it('should not navigate to the next page if already on the last page', () => {
    component.currentPage = 1; // Set current page to the last page
    component.hasNextPage = false; // Disallow next page
    component.nextPage();
    expect(component.currentPage).toBe(1); // Should remain on the same page
  });

  it('should navigate to the previous page', () => {
    component.currentPage = 1; // Set current page to 1
    component.previousPage();
    expect(component.currentPage).toBe(0); // Should go back to page 0
  });

  it('should not navigate to the previous page if already on the first page', () => {
    component.currentPage = 0; // Set current page to 0
    component.previousPage();
    expect(component.currentPage).toBe(0); // Should remain on the same page
  });

  it('should handle search functionality correctly', () => {
    component.onSearch('Books');
    expect(component.categories.length).toBe(1); // Should filter down to 1 category
    component.onSearch(''); // Reset search
    expect(component.categories.length).toBe(1); // Should return to original count
  });
});
