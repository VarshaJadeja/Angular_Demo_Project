// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ProductDetailsComponent } from './product-details.component';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { ActivatedRoute } from '@angular/router';
// import { ToastrModule, ToastrService, ToastNoAnimationModule } from 'ngx-toastr';
// import { of } from 'rxjs';

// describe('ProductDetailsComponent', () => {
//   let component: ProductDetailsComponent;
//   let fixture: ComponentFixture<ProductDetailsComponent>;

//   beforeEach(async () => {
//     // Mock ActivatedRoute
//     const activatedRouteStub = {
//       snapshot: {
//         params: { id: '1' }  // Example snapshot data
//       }
//     };

//     await TestBed.configureTestingModule({
//       declarations: [ProductDetailsComponent],
//       imports: [
//         FormsModule,
//         HttpClientModule,
//         ToastrModule.forRoot()  // Import ToastrModule with .forRoot()
//       ],
//       providers: [
//         { provide: ActivatedRoute, useValue: activatedRouteStub },
//         ToastrService  // Provide ToastrService explicitly
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(ProductDetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   // Add more test cases as needed
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { HttpClientTestingModule, provideHttpClientTesting} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@app/services/product-service.service';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // Create a mock ActivatedRoute
    mockActivatedRoute = {
      snapshot: {
        params: { id: '1' }
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent ],
      imports: [
        
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ProductService,
        ToastrService,
        provideHttpClient(),
        provideHttpClientTesting(),
        Router
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

