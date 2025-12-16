import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart(product: any) {
    const existing = this.cartItems.find(item => item.name === product.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.cartItemsSubject.next([...this.cartItems]);
  }

  removeItem(product: any) {
    this.cartItems = this.cartItems.filter(item => item.name !== product.name);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  updateQuantity(product: any, delta: number) {
    const item = this.cartItems.find(i => i.name === product.name);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) {
        this.removeItem(product);
      } else {
        this.cartItemsSubject.next([...this.cartItems]);
      }
    }
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next([]);
  }

  getItems() {
    return [...this.cartItems];
  }
}
