import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { IUser } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: IUser | null = null;
  Firstname = '';
  Lastname = '';
  PictureUrl = '';
  Email = '';
  passWord = '';
  birthday = '';
  errorMessage: string | undefined;

  constructor(private router: Router, private authService: AuthService){}

  onSubmit(): void {
    // Basic form validation
    if (!this.Firstname || !this.Lastname || !this.Email || !this.passWord || !this.birthday) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.Email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    // Password validation (example: minimum 6 characters)
    if (this.passWord.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    this.authService.register(
      this.Firstname,
      this.Lastname,
      this.PictureUrl,
      this.Email,
      this.passWord,
      this.birthday
    ).subscribe({
      next: (result) => {
        this.user = result;
        this.router.navigate(['/profile', result._id]);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        if (error.status === 409) {
          this.errorMessage = 'Email address already exists';
        } else if (error.status === 400) {
          this.errorMessage = 'Invalid registration data';
        } else {
          this.errorMessage = 'Registration failed. Please try again later';
        }
      }
    });
  }
} 
