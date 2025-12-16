import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { UserService } from '../../../../shared/services/user-services/user-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf, NgClass],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  passwordVisible = false;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
  
    this.loading = true;
    const { email, password } = this.loginForm.value;
  
    this.userService.login(email, password).subscribe({
      next: (response) => {
        this.loading = false;
        console.log('Login successful:', response);
  
        // ✅ Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(response));
  
        // ✅ Step 2: Handle redirection after login
        const redirect = localStorage.getItem('redirectAfterLogin');
        if (redirect) {
          this.router.navigate([redirect]);
          localStorage.removeItem('redirectAfterLogin');
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        this.loading = false;
        alert('Invalid email or password');
        console.error('Login failed:', err);
      }
    });
  }
  

  togglePassword(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
