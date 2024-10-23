import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandComponent } from './brand.component';
import { BrandService } from '../../../core/services/brand/brand.service';
import { of, throwError } from 'rxjs';
import { DataFormComponent } from '../../organisms/data-form/data-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;
  let mockBrandService: jest.Mocked<BrandService>;

  beforeEach(async () => {
    mockBrandService = {
      create: jest.fn(),
      getPagedBrands: jest.fn(),
      getBrandsPaged: jest.fn()
    } as unknown as jest.Mocked<BrandService>;

    await TestBed.configureTestingModule({
      declarations: [BrandComponent, DataFormComponent],
      providers: [{ provide: BrandService, useValue: mockBrandService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(BrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call BrandService.create on handleSubmit', () => {
    const formData = { name: 'Nike', description: 'A brand for sportswear' };
    mockBrandService.create.mockReturnValue(of(true));

    component.handleSubmit(formData);

    expect(mockBrandService.create).toHaveBeenCalledWith(formData);
  });

  it('should reset form on successful brand creation', () => {
    const formData = { name: 'Nike', description: 'A brand for sportswear' };
    mockBrandService.create.mockReturnValue(of(true));
    component.dataFormComponent = { resetForm: jest.fn() } as unknown as DataFormComponent;

    component.handleSubmit(formData);

    expect(component.dataFormComponent.resetForm).toHaveBeenCalled();
  });

  it('should handle error on brand creation', () => {
    const formData = { name: 'Nike', description: 'A brand for sportswear' };
    mockBrandService.create.mockReturnValue(throwError(() => new Error('Error creating brand')));

    component.handleSubmit(formData);

    // Add any additional error handling checks here if needed
  });
});