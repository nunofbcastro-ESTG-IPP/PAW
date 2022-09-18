import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurshaseReviewComponent } from './purshase-review.component';

describe('PurshaseReviewComponent', () => {
  let component: PurshaseReviewComponent;
  let fixture: ComponentFixture<PurshaseReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurshaseReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurshaseReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
