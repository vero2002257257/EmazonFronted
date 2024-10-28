import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandComponent } from './components/pages/brand/brand.component';
import { BrandService } from './core/services/brand/brand.service';
import { of, throwError } from 'rxjs';
import { DataFormComponent } from './components/organisms/data-form/data-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;
  let mockBrandService: jest.Mocked<BrandService>;

  beforeEach(async () => {
    mockBrandService = {
      create: jest.fn(),
      getPagedBrands: jest.fn(),
      getBrandsPaged: jest.fn(),
    } as unknown as jest.Mocked<BrandService>;

    await TestBed.configureTestingModule({
      declarations: [BrandComponent, DataFormComponent],
      providers: [
        { provide: BrandService, useValue: mockBrandService },
        FormBuilder,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});