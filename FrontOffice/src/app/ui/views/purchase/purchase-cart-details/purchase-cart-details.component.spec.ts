import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCartDetailsComponent } from './purchase-cart-details.component';

describe('PurchaseCartDetailsComponent', () => {
  let component: PurchaseCartDetailsComponent;
  let fixture: ComponentFixture<PurchaseCartDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseCartDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseCartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
