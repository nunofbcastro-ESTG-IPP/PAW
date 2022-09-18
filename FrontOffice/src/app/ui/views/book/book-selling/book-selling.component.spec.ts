import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSellingComponent } from './book-selling.component';

describe('BookSellingComponent', () => {
  let component: BookSellingComponent;
  let fixture: ComponentFixture<BookSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookSellingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
