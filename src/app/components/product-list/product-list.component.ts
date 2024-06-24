import { Component, OnInit } from '@angular/core';
import { ProductDetails } from '@models/product.model';

import { ProductService } from '@services/product-service.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  product?: ProductDetails[];
  currentProduct: ProductDetails = {
    id: '',
    productName: '',
    productDescription: '',
    productPrice: 0,
    productStock: 0,
    categoryId: '',
    productType: '',
    productStatus: [],
  };
  currentIndex = -1;
  title = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.productService.getAll().subscribe({
      next: (data) => {
        this.product = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveProducts();
    this.currentProduct = {
      id: '',
      productName: '',
      productDescription: '',
      productPrice: 0,
      productStock: 0,
      categoryId: '',
      productType: '',
      productStatus: [],
    };
    this.currentIndex = -1;
  }

  setActiveProduct(product: ProductDetails, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.currentProduct = {
      id: '',
      productName: '',
      productDescription: '',
      productPrice: 0,
      productStock: 0,
      categoryId: '',
      productType: '',
      productStatus: [],
    };
    this.currentIndex = -1;

    this.productService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.product = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
