import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer {
  appName = 'SmartKart';

  quickLinks = [
    { label: 'Home', path: '/home' },
    { label: 'Products', path: '/products' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  supportLinks = [
    { label: 'FAQ', path: '/faq' },
    { label: 'Help Center', path: '/help' },
    { label: 'Terms of Use', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' }
  ];

  contact = {
    address: 'Greater Noida, India',
    email: 'support@smartkart.com',
    phone: '+91 98765 43210'
  };
}
