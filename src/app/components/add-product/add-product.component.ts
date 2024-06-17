import { Component, ViewChild } from '@angular/core';
import { ProductDetails } from '@models/product.model';
import { ProductService } from '@services/product-service.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Observable, map, startWith } from 'rxjs';
import { Categories } from '@models/categories.model';
import { DateTime } from 'luxon';
import { FileUploadService } from '@services/file-upload-service.service';
import { TimepickerDirective } from 'ngx-material-timepicker';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  myControl = new FormControl('');
  category: Categories[] = [];
  categories?: Categories[] = [];
  filteredOptions?: Observable<Categories[]>;
  private categorySubject = new BehaviorSubject<Categories[]>([]);
  productStatus = new FormControl();
  formControlItem = new FormControl('');
  maxTime: DateTime = DateTime.local().set({
    hour: 16,
  });
  minTime: DateTime = DateTime.local().set({
    hour: 14,
  });
  required: boolean = !1;
  file: File | null = null;

  @ViewChild('timepicker') timepicker!: TimepickerDirective;
  openFromIcon(timepicker: { open: () => void }) {
    if (!this.formControlItem.disabled) {
      timepicker.open();
    }
  }

  statusFormArray: string[] = [];
  products = [
    { name: 'New' },
    { name: 'Pending' },
    { name: 'InProgress' },
    { name: 'Completed' },
  ];

  onChange(status: string, event: Event) {
    const isChecked: boolean = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.statusFormArray.push(status);
    } else {
      let index = this.statusFormArray.indexOf(status);
      this.statusFormArray.splice(index, 1);
    }
  }

  product: ProductDetails = {
    productName: '',
    productDescription: '',
    productPrice: 0,
    productStock: 0,
    categoryId: '',
    productType: '',
    productStatus: [],
    fromDate: new Date(),
    toDate: new Date(),
    time: DateTime.local(),
    fileUpload: '',
  };

  submitted = false;
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private fileUploadService: FileUploadService
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
      productStatus: this.formBuilder.array([]),
      fromDate: [new Date(), Validators.required],
      toDate: [new Date(), Validators.required],
      time: ['', Validators.required],
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
      this.categories = categories;
      this.categorySubject.next(categories);
    });
  }
 
  onChangeFile(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    }
  }

  saveProduct(): void {
    console.log('File before upload:', this.file);
    if (this.file) {
      this.fileUploadService.upload(this.file).subscribe({
        next: (response) => {
          const filename = response.name;
          console.log(response);
          const data = {
            productName: this.productForm.get('productName')?.value,
            productDescription: this.productForm.get('productDescription')?.value,
            productPrice: this.productForm.get('productPrice')?.value,
            productStock: this.productForm.get('productStock')?.value,
            categoryId: this.productForm.get('categoryId')?.value,
            productType: this.productForm.get('productType')?.value,
            productStatus: this.statusFormArray,
            fromDate: this.productForm.get('fromDate')?.value.toString(),
            toDate: this.productForm.get('toDate')?.value.toString(),
            time: this.productForm.get('time')?.value.toString(),
            fileUpload: filename,
          };
          console.log('data', data);
          this.productService.create(data).subscribe({
            next: (res) => {
              console.log(res);
              this.submitted = true;
            },
            error: (e) => console.error(e),
          });
        },
        error: (error) => {
          console.error('Error uploading file:', error);
        },
      });
    } else {
      console.error('No file selected.');
    }
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
      fromDate: null,
      toDate: null,
    });
  }
 
}
