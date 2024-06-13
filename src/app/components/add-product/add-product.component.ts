import { Component } from '@angular/core';
import { ProductDetails } from '../../models/product.model';
import { ProductService } from '../../services/product-service.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { Categories } from '../../models/categories.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  myControl = new FormControl('');
  category: Categories[] = [];
  filteredOptions?: Observable<Categories[]>;
  private categorySubject = new BehaviorSubject<Categories[]>([]);

  product: ProductDetails = {
    productName: '',
    productDescription: '',
    productPrice: 0,
    productStock: 0,
    categoryId: '',
    productType: '',
  };

  submitted = false;
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productPrice: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      productStock: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      categoryId: ['', Validators.required],
      productType: ['New'],
    });
  }

  ngOnInit() {
    this.getCategories();
    this.categorySubject.subscribe((categories) => {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
    });
  }

  private _filter(value: string): Categories[] {
    const filterValue = value.toLowerCase();
    if (this.category) {
      return this.category.filter((option) =>
        option.type?.toLowerCase().includes(filterValue)
      );
    } else {
      return [];
    }
  }

  getCategories(): void {
    this.productService.getCategories().subscribe((categories) => {
      this.category = categories;
      this.categorySubject.next(categories);
    });
  }
  saveProduct(): void {
    const data = {
      productName: this.productForm.get('productName')?.value,
      productDescription: this.productForm.get('productDescription')?.value,
      productPrice: this.productForm.get('productPrice')?.value,
      productStock: this.productForm.get('productStock')?.value,
      categoryId: this.productForm.get('category.categoryId')?.value,
      productType: this.productForm.get('productType')?.value,
    };

    this.productService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  newProduct(): void {
    this.submitted = false;
    this.productForm.setValue({
      productName: null,
      productDescription: null,
      productPrice: null,
      productStock: null,
      categoryId: null,
      productType: null,
    });
  }
  // get name() {
  //   return this.productForm.get('productName');
  // }
  // getCategories(): void {
  // this.productService.getCategories().subscribe({
  //   next: (data: Categories[] | undefined) => {
  //     this.category = data;
  //     console.log(data);
  //     this.categorySubject.next(data);
  //   },
  //   error: (e: any) => console.error(e),
  // });
  // }
}
