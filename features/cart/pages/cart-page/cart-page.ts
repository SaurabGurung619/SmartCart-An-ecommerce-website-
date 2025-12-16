import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../../shared/services/cart'; 
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth-services/auth-service';

@Component({
  standalone: true,
  selector: 'app-cart-page',
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.scss'],
  imports: [NgIf, NgFor]
})
export class CartPage implements OnInit {
  cartItems: any[] = [];

  private router = inject(Router);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  increaseQty(item: any) {
    this.cartService.updateQuantity(item, 1);
  }

  decreaseQty(item: any) {
    this.cartService.updateQuantity(item, -1);
  }

  removeItem(item: any) {
    this.cartService.removeItem(item);
  }

  proceedToPayment() {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/payment']); // You must define this route
    } else {
      localStorage.setItem('redirectAfterLogin', '/payment');
      this.router.navigate(['/auth/login']);
    }
  }
}