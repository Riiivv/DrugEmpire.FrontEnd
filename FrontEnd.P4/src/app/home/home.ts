import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ProductResponse } from '../interfaces/product.dto';
import { ProductService } from '../services/product.services';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private productService = inject(ProductService);

  products: ProductResponse[] = [];
  featuredProducts: ProductResponse[] = [];
  loading = true;
  errorMessage = '';

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        console.log('Products from API:', data);
        this.products = data;
        this.featuredProducts = this.getRandomProducts(8);
        this.loading = false;
      },
      error: (err) => {
        console.error('Product API error:', err);
        this.errorMessage = 'Could not load products.';
        this.loading = false;
      }
    });
  }

  getRandomProducts(count: number): ProductResponse[] {
    const shuffled = [...this.products].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
}