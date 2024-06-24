import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideHttpClient } from '@angular/common/http';
import { DateTime } from 'luxon';
describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductComponent ],
      imports: [
        ToastrModule.forRoot(),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatNativeDateModule,
        MatDatepickerModule,
        NgxMaterialTimepickerModule 
      ],
      providers:[provideHttpClient(),
        provideHttpClientTesting(),]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.productForm).toBeDefined();
    expect(component.productForm.valid).toBe(false);
    expect(component.productForm.controls['productName'].value).toEqual('');
    expect(component.productForm.controls['productDescription'].value).toEqual('');
    expect(component.productForm.controls['productPrice'].value).toEqual(''); 
    expect(component.productForm.controls['productStock'].value).toEqual('');
    expect(component.productForm.controls['categoryId'].value).toEqual('');
    expect(component.productForm.controls['productType'].value).toEqual('New');
    expect(component.productForm.controls['productStatus'].value).toEqual([]);
    expect(component.productForm.controls['fromDate'].value).toEqual(jasmine.any(Date));
    expect(component.productForm.controls['toDate'].value).toEqual(jasmine.any(Date));
    // expect(component.productForm.controls['time'].value instanceof DateTime).toBeTruthy();
  });

  it('should become valid after setting values', fakeAsync(() => {
    // Set values to form
    expect(component.productForm).toBeDefined();
    component.productForm.patchValue({
      productName: 'Test Product',
      productDescription: 'Description',
      productPrice: 100,
      productStock: 10,
      categoryId: '1',
      productType: 'New',
      fromDate: new Date(),
      toDate: new Date(),
      // time: DateTime.local()
    });

    // Trigger change detection
    fixture.detectChanges();
    tick();

    // Form should now be valid
    expect(component.productForm.valid).toBe(true);
  }));
});
