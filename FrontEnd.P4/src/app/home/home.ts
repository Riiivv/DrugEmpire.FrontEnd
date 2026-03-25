import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ProductResponse } from '../interfaces/product.dto';
import { ProductService } from '../services/product.services';
import { CartService } from '../services/cart.services';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private http = inject(HttpClient);

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

  addToCart(product: ProductResponse): void {
    const user = localStorage.getItem('user');

    if (!user) {
      alert('Du skal være logget ind');
      return;
    }

    const currentUser = JSON.parse(user);

    this.cartService.getAllCarts().subscribe({
      next: (carts) => {
        const userCart = carts.find(c => c.userId === currentUser.userId);

        if (!userCart) {
          alert('Ingen cart fundet');
          return;
        }

        const request = {
          cartId: userCart.cartId,
          productId: product.productId,
          quantity: 1
        };

        this.http.post('https://localhost:7229/api/CartItem', request).subscribe({
          next: () => {
            alert(`${product.name} added to cart`);
          },
          error: (err) => {
            console.log(err);
            alert('Kunne ikke tilføje produkt til cart');
          }
        });
      },
      error: (err) => {
        console.log(err);
        alert('Kunne ikke hente cart');
      }
    });
  }
}