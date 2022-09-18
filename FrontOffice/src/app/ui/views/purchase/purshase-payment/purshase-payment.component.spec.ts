import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurshasePaymentComponent } from './purshase-payment.component';

describe('PurshasePaymentComponent', () => {
  let component: PurshasePaymentComponent;
  let fixture: ComponentFixture<PurshasePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurshasePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurshasePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
