import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurshaseShippingComponent } from './purshase-shipping.component';

describe('PurshaseShippingComponent', () => {
  let component: PurshaseShippingComponent;
  let fixture: ComponentFixture<PurshaseShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurshaseShippingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurshaseShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
