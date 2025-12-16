import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductList {
  @Input() products: any[] = [];
}
