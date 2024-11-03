import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFormExtComponent } from './card-form-ext.component';

describe('CardFormExtComponent', () => {
  let component: CardFormExtComponent;
  let fixture: ComponentFixture<CardFormExtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFormExtComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFormExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});