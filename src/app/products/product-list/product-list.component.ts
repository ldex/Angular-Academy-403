import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Product } from '../../models/product.interface';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list', // <app-product-list />
  standalone: true,
  imports: [CommonModule, ProductDetailComponent, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  private productService = inject(ProductService)
  private router = inject(Router)

  selectedProduct: Product
  title: string = 'Products'
  products$: Observable<Product[]> = this.productService.products$

  // Pagination
  pageSize = 5
  start = 0
  end = this.pageSize
  pageNumber = 1

  previousPage() {
    this.start -= this.pageSize
    this.end -= this.pageSize
    this.pageNumber--
    this.selectedProduct = null
  }

  nextPage() {
    this.start += this.pageSize
    this.end += this.pageSize
    this.pageNumber++
    this.selectedProduct = null
  }

  onSelect(product: Product) {
    this.router.navigateByUrl('/products/' + product.id)

    this.selectedProduct = product
  }
}
