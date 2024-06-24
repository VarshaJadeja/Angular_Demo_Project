import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '@services/product-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetails } from '@models/product.model';
// import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() productDetails: ProductDetails = {
    id: '',
    productName: '',
    productDescription: '',
    productPrice: 0,
    productStock: 0,
    categoryId: '',
    productType: '',
    productStatus: [],
  };

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    // private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.getTutorial(this.route.snapshot.params['id']);
    }
  }

  getTutorial(id: string): void {
    this.productService.get(id).subscribe({
      next: (data) => {
        this.productDetails = data;
        console.log(data);
      },
      error: (e) => console.error(e),
    });
  }

  updateTutorial(): void {
    if (!this.productDetails.id) {
      console.error('Product id is undefined');
      return;
    }
    this.productService
      .update(this.productDetails.id, this.productDetails)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/products']);
          // this.toastr.success('This Product was updated successfully!');
        },
        error: (e) => console.error(e),
      });
  }

  deleteTutorial(): void {
    if (!this.productDetails.id) {
      // Handle the case where id is undefined 
      console.error('Product id is undefined');
      return;
    }
    this.productService.delete(this.productDetails.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/products']);
        // this.toastr.success('This Product was deleted successfully!');
      },
      error: (e) => console.error(e),
    });
  }
}
