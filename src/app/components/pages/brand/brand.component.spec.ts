import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { BrandComponent } from './brand.component';
import { BrandService } from '../../../core/services/brand/brand.service';
import { CoreModule } from '../../../core/core.module';
import { ToastService } from '../../../core/services/toast.service';

describe('BrandComponent', () => {
  let component: BrandComponent;
  let fixture: ComponentFixture<BrandComponent>;
  let brandServiceMock: any;

  beforeEach(async () => {
    // Creamos un mock del BrandService
    brandServiceMock = {
      getBrandsPaged: jest.fn().mockReturnValue(of({ content: [], totalPages: 1 })),
      create: jest.fn().mockReturnValue(of(true))
    };

    await TestBed.configureTestingModule({
      declarations: [BrandComponent],
      imports: [CoreModule, BrowserAnimationsModule],
      providers: [
        { provide: BrandService, useValue: brandServiceMock },
        ToastService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call BrandService.getBrandsPaged on loadbrands', () => {
    component.loadbrands();
    expect(brandServiceMock.getBrandsPaged).toHaveBeenCalledWith(component.currentPage, component.pageSize, component.sortField, component.sortOrder);
  });

  it('should handle successful brand creation', () => {
    const brandData = { id: 1, name: 'Test Brand', description: 'Test Description' };
    component.handleSubmit(brandData);
    expect(brandServiceMock.create).toHaveBeenCalledWith(brandData);
  });

  it('should handle error on brand creation', () => {
    brandServiceMock.create.mockReturnValueOnce(throwError(() => new Error('Error')));
    const brandData = { id: 1, name: 'Test Brand', description: 'Test Description' };
    component.handleSubmit(brandData);
    expect(brandServiceMock.create).toHaveBeenCalledWith(brandData);
  });

  it('should call loadbrands with correct sort parameters', () => {
    const sortSpy = jest.spyOn(component, 'loadbrands');
    component.sort('name,desc');
    expect(component.sortField).toBe('name');
    expect(component.sortOrder).toBe('desc');
    expect(sortSpy).toHaveBeenCalled();
  });

  it('should increment currentPage and call loadbrands on nextPage', () => {
    component.hasNextPage = true;
    const loadBrandsSpy = jest.spyOn(component, 'loadbrands');
    component.nextPage();
    expect(component.currentPage).toBe(1);
    expect(loadBrandsSpy).toHaveBeenCalled();
  });

  it('should decrement currentPage and call loadbrands on previousPage', () => {
    component.currentPage = 1;
    const loadBrandsSpy = jest.spyOn(component, 'loadbrands');
    component.previousPage();
    expect(component.currentPage).toBe(0);
    expect(loadBrandsSpy).toHaveBeenCalled();
  });

  it('should filter brands by name or description', () => {
    component.brands = [
      {  name: 'Test Brand', description: 'Test Description' },
      {  name: 'Another Brand', description: 'Another Description' },
    ];
    component.onSearch('Test');
    expect(component.brands.length).toBe(1);
    expect(component.brands[0].name).toBe('Test Brand');
  });
});