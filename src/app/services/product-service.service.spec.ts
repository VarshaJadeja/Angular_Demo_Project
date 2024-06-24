import { TestBed } from '@angular/core/testing';

import { ProductService } from './product-service.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProductServiceService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
