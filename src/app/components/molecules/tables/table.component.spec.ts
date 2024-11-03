import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './tables.component';
import { SelectorComponent } from '../../atoms/selector/selector.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent, SelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    component.columns = [
      { header: 'Name', field: 'name' },
      { header: 'Description', field: 'description' },
    ];
    component.data = [
      { name: 'Item A', description: 'Description A' },
      { name: 'Item B', description: 'Description B' },
      { name: 'Item C', description: 'Description C' },
      { name: 'Item D', description: 'Description D' },
    ];
    component.pageSize = 2;
    component.currentPage = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort data correctly', () => {
    component.onSortChange('name,asc');
    expect(component.data[0].name).toBe('Item A');
    component.onSortChange('name,desc');
    expect(component.data[0].name).toBe('Item D');
  });

  it('should filter data correctly', () => {
    component.onFilterChange('Item A');
    expect(component.data.length).toBe(1);
    expect(component.data[0].name).toBe('Item A');
  });

  it('should select a row correctly', () => {
    component.onRowSelect(component.data[0]);
    expect(component.selectedRow).toBe(component.data[0]);
  });

  it('should change page correctly', () => {
    component.onPageChange(1);
    expect(component.currentPage).toBe(1);
    expect(component.paginatedData[0].name).toBe('Item C');
  });

  it('should get total pages correctly', () => {
    expect(component.getTotalPages()).toBe(2);
  });

  it('should handle empty filter correctly', () => {
    component.onFilterChange('');
    expect(component.data.length).toBe(4);
  });

  it('should handle invalid page change correctly', () => {
    component.onPageChange(-1);
    expect(component.currentPage).toBe(0);
    component.onPageChange(2);
    expect(component.currentPage).toBe(0);
  });
  it('should sort data with null or undefined values correctly', () => {
    component.data.push({ name: null, description: 'No Name' });
    component.onSortChange('name,asc');
    expect(component.data[component.data.length - 1].description).toBe(
      'No Name'
    );
  });

  it('should filter data case-insensitively', () => {
    component.onFilterChange('item a'); // Busca en minúsculas
    expect(component.data.length).toBe(1);
    expect(component.data[0].name).toBe('Item A');
  });

  it('should call paginateData when data changes', () => {
    const paginateSpy = jest.spyOn<any, any>(component, 'paginateData');
    const changes = {
      data: {
        currentValue: [{ name: 'New Item', description: 'New Description' }],
        previousValue: component.data,
        firstChange: false,
        isFirstChange: () => false,
      },
    };
    component.ngOnChanges(changes);
    expect(paginateSpy).toHaveBeenCalled();
  });

  it('should call paginateData when pageSize changes', () => {
    const paginateSpy = jest.spyOn<any, any>(component, 'paginateData');
    const changes = {
      pageSize: {
        currentValue: 5,
        previousValue: component.pageSize,
        firstChange: false,
        isFirstChange: () => false,
      },
    };
    component.ngOnChanges(changes);
    expect(paginateSpy).toHaveBeenCalled();
  });

  it('should call paginateData when currentPage changes', () => {
    const paginateSpy = jest.spyOn<any, any>(component, 'paginateData');
    const changes = {
      currentPage: {
        currentValue: 1,
        previousValue: component.currentPage,
        firstChange: false,
        isFirstChange: () => false,
      },
    };
    component.ngOnChanges(changes);
    expect(paginateSpy).toHaveBeenCalled();
  });
  it('should sort data in ascending order by specified field', () => {
    component.sortField = 'name';
    component.sortOrder = 'asc';
    component['sortData'](); // Llamada al método privado sortData
    expect(component.data[0].name).toBe('Item A');
    expect(component.data[component.data.length - 1].name).toBe('Item D');
  });

  it('should sort data in descending order by specified field', () => {
    component.sortField = 'name';
    component.sortOrder = 'desc';
    component['sortData']();
    expect(component.data[0].name).toBe('Item D');
    expect(component.data[component.data.length - 1].name).toBe('Item A');
  });

  it('should handle sorting with null or undefined values', () => {
    component.data.push({ name: null, description: 'No Name' });
    component.sortField = 'name';
    component.sortOrder = 'asc';
    component['sortData']();
    expect(component.data[component.data.length - 1].description).toBe(
      'No Name'
    );
  });
});
