import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRequest, CartResponse } from '../interfaces/cart.dto';
import { CartService } from '../services/cart.services';
import { CartItemService } from '../services/cartItems.services';
import { CartItemResponse } from '../interfaces/cartItem.dto';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  carts: CartResponse[] = [];
  cartItems: CartItemResponse[] = [];
  currentUser: any = null;
  errorMessage = '';
  isLoading = true;

  constructor(
    private cartService: CartService,
    private cartItemService: CartItemService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (!user) {
      this.errorMessage = 'Du er ikke logget ind';
      this.isLoading = false;
      this.cdr.detectChanges();
      return;
    }

    this.currentUser = JSON.parse(user);

    this.cartService.getAllCarts().subscribe({
      next: (res) => {
        const currentUserId = Number(this.currentUser.userId);
        const userCarts = res.filter(c => Number(c.userId) === currentUserId);

        if (userCarts.length > 0) {
          this.carts = userCarts;
          this.loadCartItems(userCarts[0].cartId);
        } else {
          const request: CartRequest = {
            userId: currentUserId
          };

          this.cartService.createCart(request).subscribe({
            next: (newCart) => {
              this.carts = [newCart];
              this.loadCartItems(newCart.cartId);
            },
            error: (err) => {
              console.log(err);
              this.errorMessage = 'kunne ikke oprette cart';
              this.isLoading = false;
              this.cdr.detectChanges();
            }
          });
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'kunne ikke hente cart';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadCartItems(cartId: number): void {
    this.cartItemService.getAllCartItems().subscribe({
      next: (items) => {
        this.cartItems = items.filter(i => i.cartId === cartId);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = 'kunne ikke hente cart items';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}