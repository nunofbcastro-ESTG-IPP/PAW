import { TestBed } from '@angular/core/testing';

import { BookValidationsService } from './book-validations.service';

describe('BookValidationsService', () => {
  let service: BookValidationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookValidationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
