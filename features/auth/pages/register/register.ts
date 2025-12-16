import { UserService } from '../../../../shared/services/user-services/user-service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
  AsyncValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { UserClass } from '../../../../shared/services/user-classes/user-class';
import { catchError, debounceTime, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, FormsModule, NgIf, NgClass],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  registerForm: FormGroup;
  loading = false;
  passwordVisible = false;
  confirmPasswordVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.email],
        [this.emailExistsValidator()]
      ],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      location: ['', Validators.required],
      landmark: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$')
        ]
      ],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.passwordMismatch) return;

    this.loading = true;

    const formData = this.registerForm.value;
    const user: UserClass = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      landmark: formData.landmark,
      password: formData.password,
      role: 'CUSTOMER',
      status: 'ACTIVE'
    };

    this.userService.createUser(user).subscribe({
      next: () => {
        this.loading = false;
        alert('Registration Successful!');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.loading = false;
        console.error(error);
        alert('Registration Failed. Try again.');
      }
    });
  }

  togglePassword(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.passwordVisible = !this.passwordVisible;
    } else {
      this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }
  }

  get passwordMismatch(): boolean {
    const pw = this.registerForm.get('password')?.value;
    const cpw = this.registerForm.get('confirmPassword')?.value;
    return pw && cpw && pw !== cpw;
  }

  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return of(null);

      return of(control.value).pipe(
        debounceTime(500),
        switchMap(email =>
          this.userService.checkEmailExists(email).pipe(
            map((exists) => (exists ? { emailExists: true } : null)),
            catchError(() => of(null))
          )
        )
      );
    };
  }
}
