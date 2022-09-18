import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialHeaderComponent } from './partial-header.component';

describe('PartialHeaderComponent', () => {
  let component: PartialHeaderComponent;
  let fixture: ComponentFixture<PartialHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
