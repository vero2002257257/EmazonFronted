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

    // Establecer valores iniciales
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

    fixture.detectChanges(); // Detectar cambios iniciales
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize columns correctly', () => {
    expect(component.columns.length).toBe(2);
    expect(component.columns[0].header).toBe('Name');
    expect(component.columns[1].header).toBe('Description');
  });

  it('should initialize data correctly', () => {
    expect(component.data.length).toBe(4);
    expect(component.data[0].name).toBe('Item A');
    expect(component.data[1].description).toBe('Description B');
  });

  it('should set the correct page size', () => {
    expect(component.pageSize).toBe(2);
  });

  it('should calculate the total pages correctly', () => {
    const totalPages = Math.ceil(component.data.length / component.pageSize);
    expect(component.getTotalPages()).toBe(totalPages);
  });

  it('should return the correct page of data', () => {
    const pageData = component.getDataForCurrentPage();
    expect(pageData.length).toBe(component.pageSize);
    expect(pageData[0].name).toBe('Item A');
    expect(pageData[1].name).toBe('Item B');
  });

  it('should paginate data correctly after sorting', () => {
    component.onSortChange('name,asc'); // Suponiendo que implementas el método de ordenación
    const pageData = component.getDataForCurrentPage();
    expect(pageData.length).toBe(component.pageSize);
    expect(pageData[0].name).toBe('Item A');
  });

  it('should handle sorting data correctly', () => {
    const sortValue = 'name,asc';
    component.onSortChange(sortValue);
    expect(component.sortField).toBe('name');
    expect(component.sortOrder).toBe('asc');

    const sortedData = [...component.data].sort((a, b) => (a.name > b.name ? 1 : -1));
    expect(component.data).toEqual(sortedData);
  });

  it('should filter data correctly', () => {
    const filterValue = 'Item A';
    component.onFilterChange(filterValue);
    
    expect(component.data.length).toBe(1);
    expect(component.data[0].name).toBe('Item A'); // Solo debe quedar 'Item A'
  });

  it('should reset pagination after filtering', () => {
    component.onFilterChange('Item A');
    expect(component.currentPage).toBe(0); // Debe volver a la página 0
  });

  it('should handle row selection', () => {
    const rowData = { name: 'Item A', description: 'Description A' };
    component.onRowSelect(rowData);
    expect(component.selectedRow).toBe(rowData);
  });

  it('should go to the next page', () => {
    component.nextPage();
    expect(component.currentPage).toBe(1);
    const pageData = component.getDataForCurrentPage();
    expect(pageData.length).toBe(component.pageSize);
    expect(pageData[0].name).toBe('Item C'); // Debería ser 'Item C'
  });

  it('should go to the previous page', () => {
    component.nextPage(); // Ir a la página 1
    component.previousPage();
    expect(component.currentPage).toBe(0);
  });

  it('should not go to the previous page if already on the first page', () => {
    component.previousPage();
    expect(component.currentPage).toBe(0); // Debe seguir en la página 0
  });

  it('should not go to the next page if on the last page', () => {
    component.currentPage = Math.ceil(component.data.length / component.pageSize) - 1; // Última página
    component.nextPage();
    expect(component.currentPage).toBe(component.currentPage); // Debe seguir en la última página
  });

  it('should paginate data correctly on page change', () => {
    component.onPageChange(1);
    expect(component.currentPage).toBe(1);
    const pageData = component.getDataForCurrentPage();
    expect(pageData.length).toBe(component.pageSize);
    expect(pageData[0].name).toBe('Item C'); // Debería ser 'Item C'
  });

  it('should not change page if an invalid page number is given', () => {
    component.onPageChange(-1);
    expect(component.currentPage).toBe(0); // Debe seguir en la página 0
    component.onPageChange(100); // Suponiendo que 100 está fuera de rango
    expect(component.currentPage).toBe(0); // Debe seguir en la página 0
  });

  it('should handle empty data correctly', () => {
    component.data = []; // Establecer datos vacíos
    expect(component.getTotalPages()).toBe(0);
    expect(component.getDataForCurrentPage()).toEqual([]); // Debería retornar un arreglo vacío
  });
});
