import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectorComponent } from './selector.component';
import { By } from '@angular/platform-browser';

describe('SelectorComponent', () => {
  let component: SelectorComponent;
  let fixture: ComponentFixture<SelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sort change when option is selected', () => {
    const spy = jest.spyOn(component.onSortChange, 'emit');
    const selectElement = fixture.debugElement.query(
      By.css('select')
    ).nativeElement;
    selectElement.value = 'name,asc';
    selectElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith('name,asc');
  });
});
