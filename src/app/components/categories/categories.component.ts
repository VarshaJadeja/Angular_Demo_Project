import { Component, Input } from '@angular/core';
import { Categories } from '@models/categories.model';
import { ProductService } from '@services/product-service.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  category?: Categories[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.category = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }
}
