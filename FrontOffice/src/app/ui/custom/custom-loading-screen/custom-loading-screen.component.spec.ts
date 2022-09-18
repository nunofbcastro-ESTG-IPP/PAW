import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLoadingScreenComponent } from './custom-loading-screen.component';

describe('CustomLoadingScreenComponent', () => {
  let component: CustomLoadingScreenComponent;
  let fixture: ComponentFixture<CustomLoadingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomLoadingScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomLoadingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
