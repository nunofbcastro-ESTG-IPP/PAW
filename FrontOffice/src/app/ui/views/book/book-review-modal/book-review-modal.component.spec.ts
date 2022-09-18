import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookReviewModalComponent } from './book-review-modal.component';

describe('BookReviewModalComponent', () => {
  let component: BookReviewModalComponent;
  let fixture: ComponentFixture<BookReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookReviewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
