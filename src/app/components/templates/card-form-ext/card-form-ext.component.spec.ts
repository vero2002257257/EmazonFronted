import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardFormExtComponent } from './card-form-ext.component';
import { Product } from '../../../core/models/product.models';
import { Brand } from '../../../core/models/brand-model';
import { Category } from '../../../core/models/category.models';
import EventEmitter from 'events';

describe('CardFormExtComponent', () => {
  let component: CardFormExtComponent;
  let fixture: ComponentFixture<CardFormExtComponent>;

  // Mock del console.log
  const originalConsoleLog = console.log;
  beforeAll(() => {
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = originalConsoleLog;
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardFormExtComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardFormExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Input Properties', () => {
    it('should set default values', () => {
      const defaultComponent = new CardFormExtComponent();
      expect(defaultComponent.title).toBe('Create New Product');
      expect(defaultComponent.formTitle).toBe('Fill in the details below to add a new product.');
      expect(defaultComponent.brands).toEqual([]);
      expect(defaultComponent.categories).toEqual([]);
    });

    it('should accept input values', () => {
      const testTitle = 'Test Title';
      const testFormTitle = 'Test Form Title';
      const testBrands: Brand[] = [{ id: 1, name: 'Brand 1', description: 'Description' }];
      const testCategories: Category[] = [{ id: 1, name: 'Category 1', description: 'Description' }];

      component.title = testTitle;
      component.formTitle = testFormTitle;
      component.brands = testBrands;
      component.categories = testCategories;

      expect(component.title).toBe(testTitle);
      expect(component.formTitle).toBe(testFormTitle);
      expect(component.brands).toEqual(testBrands);
      expect(component.categories).toEqual(testCategories);
    });
  });

  describe('Form Submission', () => {
  
    it('should emit product on form submission', (done) => {
      const testProduct: Product = {
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        brandId: 1,
        categoryIds: [1],
        quantity: 0
      };

      // Suscribirse al evento
      component.submitForm.subscribe((emittedProduct: Product) => {
        expect(emittedProduct).toEqual(testProduct);
        done();
      });

      // Llamar al método
      component.onFormSubmit(testProduct);

      // Verificar que console.log fue llamado
      expect(console.log).toHaveBeenCalledWith('Product:', testProduct);
    });

    // Prueba específica de la función onFormSubmit
    it('should have onFormSubmit function that logs and emits product', () => {
      const testProduct: Product = {
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        brandId: 1,
        categoryIds: [1],
        quantity: 0
      };

      // Espiar el EventEmitter
      const emitSpy = jest.spyOn(component.submitForm, 'emit');

      // Llamar a la función directamente
      const result = component.onFormSubmit(testProduct);

      // Verificar que la función hizo lo que debía
      expect(console.log).toHaveBeenCalledWith('Product:', testProduct);
      expect(emitSpy).toHaveBeenCalledWith(testProduct);
      expect(result).toBeUndefined(); // Verificar el tipo de retorno
    });
  });

  describe('Template Rendering', () => {
    it('should render input values in template', () => {
      const testTitle = 'Test Title';
      const testFormTitle = 'Test Form Title';

      component.title = testTitle;
      component.formTitle = testFormTitle;
      fixture.detectChanges();

      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain(testTitle);
      expect(compiled.querySelector('p.form-title').textContent).toContain(testFormTitle);
    });
  });
});