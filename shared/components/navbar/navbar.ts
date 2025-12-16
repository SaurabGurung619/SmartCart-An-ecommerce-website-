import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ProductFilterService } from '../../services/product-filter';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth-services/auth-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit {
  userLocation: string = 'Detecting...';
  cartCount: number = 0;
  isLoggedIn = false;
  userName: string = '';

  private filterService = inject(ProductFilterService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.getUserLocation();

    // Subscribe to auth status
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });

    // Subscribe to username
    this.authService.userName$.subscribe(name => {
      this.userName = name;
    });

    // Cart count
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  onSearch(input: string) {
    const keyword = input.trim().toLowerCase();
    if (keyword.length > 0) {
      this.filterService.updateSearchTerm(keyword);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getUserLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(data => {
              const city = data.address.city || data.address.town || data.address.state || 'Your Location';
              this.userLocation = city;
            })
            .catch(() => {
              this.userLocation = 'Location Unavailable';
            });
        },
        () => {
          this.userLocation = 'Location Permission Denied';
        }
      );
    } else {
      this.userLocation = 'Geolocation not supported';
    }
  }
}
