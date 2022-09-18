import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSalesHistoryComponent } from './user-sales-history.component';

describe('UserSalesHistoryComponent', () => {
  let component: UserSalesHistoryComponent;
  let fixture: ComponentFixture<UserSalesHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSalesHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSalesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
