import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth-services/auth-service';
import { HomePage } from "../home/pages/home-page/home-page";

@Component({
  selector: 'app-redirect-to',
  imports: [HomePage],
  templateUrl: './redirect-to.html',
  styleUrl: './redirect-to.scss'
})
export class RedirectTo implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/home']); // Redirect to /home
    } else {
      // Stay at base URL (/#), no need to navigate
      // this.router.navigateByUrl('/'); // Optional: just do nothing
    }
  }
}