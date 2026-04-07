import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartRequest, CartResponse } from '../interfaces/cart.dto';
import { CartService } from '../services/cart.services';
import { CartItemService } from '../cart-item/cart-item';
import { CartItemResponse } from '../interfaces/cartItem.dto';
import { OrderService } from '../services/order.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  carts: CartResponse[] = [];
  cartItems: CartItemResponse[] = [];
  currentUser: any = null;
  errorMessage = '';
  isLoading = true;
  totalPrice = 0;

  shippingName = '';
  shippingStreet = '';
  shippingCity = '';
  shippingPostalCode = '';
  shippingCountry = '';
  shippingPhoneNumber = '';
  orderSuccess = false;

  constructor(
    private cartService: CartService,
    private cartItemService: CartItemService,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {

    const user = localStorage.getItem('user');

    if (!user) {
      this.errorMessage = 'Du er ikke logget ind';
      this.isLoading = false;
      this.cdr.detectChanges();
      return;
    }

    const nav = history.state; if (nav?.orderSuccess) { this.orderSuccess = true;
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
        this.updateTotal();
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

  removeItem(cartItemId: number): void {
    this.cartItemService.deleteCartItem(cartItemId).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(i => i.cartItemId !== cartItemId);
        this.updateTotal();
      },
      error: (err) => {
        console.log(err);
        alert('Could not remove item');
      }
    });
  }

  increaseQuantity(item: CartItemResponse): void {
    const updated = { ...item, quantity: item.quantity + 1 };

    this.cartItemService.updateCartItem(item.cartItemId, updated).subscribe({
      next: () => {
        item.quantity++;
        this.updateTotal();
      },
      error: (err) => {
        console.log(err);
        alert('Could not update quantity');
      }
    });
  }

  decreaseQuantity(item: CartItemResponse): void {
    if (item.quantity <= 1) return;

    const updated = { ...item, quantity: item.quantity - 1 };

    this.cartItemService.updateCartItem(item.cartItemId, updated).subscribe({
      next: () => {
        item.quantity--;
        this.updateTotal();
      },
      error: (err) => {
        console.log(err);
        alert('Could not update quantity');
      }
    });
  }

  updateTotal(): void {
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
    );
    this.cdr.detectChanges();
  }

  checkout(): void {
    if (!this.currentUser || this.carts.length === 0) {
      alert('No cart found');
      return;
    }

    if (
      !this.shippingName ||
      !this.shippingStreet ||
      !this.shippingCity ||
      !this.shippingPostalCode ||
      !this.shippingCountry ||
      !this.shippingPhoneNumber
    ) {
      alert('Fill all shipping fields');
      return;
    }

    this.orderService.checkout({
      userId: this.currentUser.userId,
      cartId: this.carts[0].cartId,
      shippingName: this.shippingName,
      shippingStreet: this.shippingStreet,
      shippingCity: this.shippingCity,
      shippingPostalCode: this.shippingPostalCode,
      shippingCountry: this.shippingCountry,
      shippingPhoneNumber: this.shippingPhoneNumber
    }).subscribe({
      next: (res) => {
        console.log(res);

        const deleteRequests = this.cartItems.map(item =>
          this.cartItemService.deleteCartItem(item.cartItemId).toPromise()
        );

        Promise.all(deleteRequests)
          .then(() => {
            this.cartItems = [];
            this.totalPrice = 0;

            this.shippingName = '';
            this.shippingStreet = '';
            this.shippingCity = '';
            this.shippingPostalCode = '';
            this.shippingCountry = '';
            this.shippingPhoneNumber = '';

            this.cdr.detectChanges();

            // ✅ REDIRECT I STEDET FOR ALERT

            this.router.navigate(['/my-orders'], {
              state: { orderSuccess: true }
            });
          })
          .catch((err) => {
            console.log(err);
            alert('Order created, but cart could not be cleared');
          });
      },
      error: (err) => {
        console.log(err);
        alert('Checkout failed');
      }
    });
  }
}