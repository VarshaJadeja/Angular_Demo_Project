import { Component, OnInit } from '@angular/core';
import { ProductDetails } from '../../models/product.model';

import { ProductService } from '../../services/product-service.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  tutorials?: ProductDetails[];
  currentTutorial: ProductDetails = {
    id: '',
    productName: '',
    productDescription: '',
    productPrice: 0,
    productStock: 0,
    categoryId: '',
    productType: '',
  };
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: ProductService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.tutorialService.getAll().subscribe({
      next: (data) => {
        this.tutorials = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = {
      id: '',
      productName: '',
      productDescription: '',
      productPrice: 0,
      productStock: 0,
      categoryId: '',
      productType: '',
    };
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: ProductDetails, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  searchTitle(): void {
    this.currentTutorial = {
      id: '',
      productName: '',
      productDescription: '',
      productPrice: 0,
      productStock: 0,
      categoryId: '',
      productType: '',
    };
    this.currentIndex = -1;

    this.tutorialService.findByTitle(this.title).subscribe({
      next: (data) => {
        this.tutorials = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
