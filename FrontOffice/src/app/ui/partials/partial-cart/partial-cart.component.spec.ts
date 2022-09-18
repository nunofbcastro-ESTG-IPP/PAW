import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialCartComponent } from './partial-cart.component';

describe('PartialCartComponent', () => {
  let component: PartialCartComponent;
  let fixture: ComponentFixture<PartialCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
