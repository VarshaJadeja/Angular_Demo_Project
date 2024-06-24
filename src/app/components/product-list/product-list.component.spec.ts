import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from '@sharedComponents/product-details/product-details.component';
import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

class MockActivatedRoute {
  snapshot = {
    paramMap: convertToParamMap({ id: '1' }),
    url: [{ path: 'mock-path' }],
    params: { id: '1' },
    queryParams: {},
    fragment: 'mock-fragment',
    data: {},
    queryParamMap: convertToParamMap({})
  };
}

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      imports: [FormsModule],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute
          }, provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more test cases as needed
});



