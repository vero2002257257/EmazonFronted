import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TablesComponent } from './tables.component';
import { SelectorComponent } from '../../atoms/selector/selector.component';

describe('TablesComponent', () => {
  let component: TablesComponent;
  let fixture: ComponentFixture<TablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablesComponent, SelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TablesComponent);
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

  it('should navigate to next and previous pages correctly', () => {
    component.nextPage();
    expect(component.currentPage).toBe(1);
    component.previousPage();
    expect(component.currentPage).toBe(0);
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
});
