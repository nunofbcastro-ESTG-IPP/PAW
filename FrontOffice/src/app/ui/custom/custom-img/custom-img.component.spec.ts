import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomImgComponent } from './custom-img.component';

describe('CustomImgComponent', () => {
  let component: CustomImgComponent;
  let fixture: ComponentFixture<CustomImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
