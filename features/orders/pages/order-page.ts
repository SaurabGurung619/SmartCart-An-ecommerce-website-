import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './order-page.html',
  styleUrls: ['./order-page.scss']
})
export class OrderPage {
  orders = [
    {
      id: 'ORD123456',
      productName: 'Smart WiFi Lamp',
      status: 'Delivered',
      date: '2025-06-25',
      total: 1199
    },
    {
      id: 'ORD123457',
      productName: 'Bluetooth Speaker',
      status: 'Shipped',
      date: '2025-06-28',
      total: 2199
    }
  ];
}
