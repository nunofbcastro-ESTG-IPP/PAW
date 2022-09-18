import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCheckoutComponent } from './purchase-checkout.component';

describe('PurchaseCheckoutComponent', () => {
  let component: PurchaseCheckoutComponent;
  let fixture: ComponentFixture<PurchaseCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
