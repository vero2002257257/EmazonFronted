import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryComponent } from './category.component';
import { CategoryService } from '../../../core/services/category/category.service';
import { TemplatesModule } from '../../templates/templates.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { DataFormComponent } from '../../organisms/data-form/data-form.component';
import { Category } from '../../../core/models/category.models';
import { FormBuilder } from '@angular/forms';

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
      providers: [{ provide: CategoryService, useValue: mockCategoryService }, FormBuilder],
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
    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalledWith(
      0,
      component.pageSize,
      component.sortField,
      component.sortOrder
    );
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
  // Verifica que el método `sort` se llama correctamente y actualiza la lista.
  it('should sort categories by selected field', () => {
    const sortValue = 'name,desc';
    component.sort(sortValue);

    // Verifica que se haya actualizado la propiedad `sortField` y `sortOrder`.
    expect(component.sortField).toBe('name');
    expect(component.sortOrder).toBe('desc');
    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalled();
  });

  // Verifica que `loadCategories` maneje correctamente una respuesta con múltiples páginas.
  it('should set hasNextPage to true if there are more pages', () => {
    const mockResponse = {
      content: [{ name: 'Books', description: 'Various books' }],
      totalPages: 2,
    };
    mockCategoryService.getCategoriesPaged.mockReturnValue(of(mockResponse));

    component.loadCategories();

    expect(component.hasNextPage).toBe(true);
  });

  // Verifica que `loadCategories` maneje correctamente el caso en el que no haya más páginas.
  it('should set hasNextPage to false if on the last page', () => {
    const mockResponse = {
      content: [{ name: 'Books', description: 'Various books' }],
      totalPages: 1,
    };
    mockCategoryService.getCategoriesPaged.mockReturnValue(of(mockResponse));
    component.currentPage = 1; // Simula estar en la última página.

    component.loadCategories();

    expect(component.hasNextPage).toBe(false);
  });

  // Prueba la navegación a la página anterior desde la página 1.
  it('should go to previous page if not on the first page', () => {
    component.currentPage = 1; // Comienza en la página 1.
    component.previousPage();

    expect(component.currentPage).toBe(0); // Debería volver a la página 0.
    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalled();
  });

  // Verifica que `onSearch` resetee la búsqueda si el query está vacío.
  it('should reload categories if search query is empty', () => {
    jest.spyOn(component, 'loadCategories');

    component.onSearch('');

    // Verifica que `loadCategories` haya sido llamado.
    expect(component.loadCategories).toHaveBeenCalled();
  });
  it('should call loadCategories with new sorting when sort is called', () => {
    jest.spyOn(component, 'loadCategories');
    component.sort('description,desc');

    expect(component.sortField).toBe('description');
    expect(component.sortOrder).toBe('desc');
    expect(component.loadCategories).toHaveBeenCalled();
  });
  it('should load categories and set hasNextPage to true if there are more pages', () => {
    const mockResponse = {
      content: [{ name: 'Category1', description: 'Description1' }],
      totalPages: 2,
    };
    mockCategoryService.getCategoriesPaged.mockReturnValue(of(mockResponse));

    component.loadCategories();

    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalledWith(
      component.currentPage,
      component.pageSize,
      component.sortField,
      component.sortOrder
    );
    expect(component.hasNextPage).toBe(true);
    expect(component.categories.length).toBe(1);
  });
  it('should sort categories by field and direction', () => {
    component.sort('name,asc');
    expect(component.sortField).toBe('name');
    expect(component.sortOrder).toBe('asc');
    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalled();
  });

  it('should go to the next page if hasNextPage is true', () => {
    component.hasNextPage = true;
    component.nextPage();
    expect(component.currentPage).toBe(1);
    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalled();
  });

  it('should not go to the next page if hasNextPage is false', () => {
    component.hasNextPage = false;
    component.nextPage();
    expect(component.currentPage).toBe(0);
  });

  it('should go to the previous page if not on the first page', () => {
    component.currentPage = 1;
    component.previousPage();
    expect(component.currentPage).toBe(0);
    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalled();
  });
  it('should handle an empty response when loading categories', () => {
    const mockResponse = {
      content: [],
      totalPages: 0,
    };
    mockCategoryService.getCategoriesPaged.mockReturnValue(of(mockResponse));

    component.loadCategories();

    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalledWith(
      component.currentPage,
      component.pageSize,
      component.sortField,
      component.sortOrder
    );
    expect(component.categories.length).toBe(0);
    expect(component.hasNextPage).toBe(false);
  });
  it('should update sorting and reload categories when sort is called', () => {
    component.sort('name,desc');

    // Verifica que las propiedades `sortField` y `sortOrder` se actualicen.
    expect(component.sortField).toBe('name');
    expect(component.sortOrder).toBe('desc');
    expect(mockCategoryService.getCategoriesPaged).toHaveBeenCalled();
  });
  it('should not navigate to next page if on the last page', () => {
    component.currentPage = 1;
    component.hasNextPage = false;

    component.nextPage();

    expect(component.currentPage).toBe(1); // Debe permanecer en la misma página.
  });
});
