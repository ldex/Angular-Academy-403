import { Component, Input, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  private productService = inject(ProductService)
  private router = inject(Router)

  @Input() product: Product

  @Input() set id(productId) {
    this
      .productService
      .getProductById(productId)
      .subscribe(
        data => this.product = data
      )
  }

  deleteProduct() {
    this
      .productService
      .deleteProduct(this.product.id)
      .subscribe(
        {
          next: () => {
            console.log('Product deleted on server')
            this.productService.resetCache()
            this.router.navigateByUrl('/products')
          },
          error: err => {
            console.error('Could not delete product! ' + err.message)
          }
        }
      )
  }
}
