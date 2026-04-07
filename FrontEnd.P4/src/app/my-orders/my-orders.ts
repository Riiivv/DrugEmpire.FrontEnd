import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.services';
import { OrderResponse } from '../interfaces/order.dto';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders implements OnInit {
  orders: OrderResponse[] = [];
  errorMessage = '';
  isLoading = true;
  currentUser: any = null;
  orderSuccess = false;

constructor(
  private orderService: OrderService,
  private cdr: ChangeDetectorRef
) {}

 ngOnInit(): void {
  const user = localStorage.getItem('user');

  console.log('USER RAW:', user);

  if (!user) {
    this.errorMessage = 'Du er ikke logget ind';
    this.isLoading = false;
    return;
  }

  this.currentUser = JSON.parse(user);

  console.log('USER ID:', this.currentUser.userId);

this.orderService.getMyOrders(this.currentUser.userId).subscribe({
  next: (res) => {
    console.log('ORDERS:', res);
    this.orders = res;
    this.isLoading = false;
    this.cdr.detectChanges();
  },
  error: (err) => {
    console.log(err);
    this.errorMessage = 'Kunne ikke hente ordrer';
    this.isLoading = false;
    this.cdr.detectChanges();
  }
});
}
}