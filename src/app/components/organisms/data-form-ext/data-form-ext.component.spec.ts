import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormExtComponent } from './data-form-ext.component';

describe('DataFormExtComponent', () => {
  let component: DataFormExtComponent;
  let fixture: ComponentFixture<DataFormExtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataFormExtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataFormExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
