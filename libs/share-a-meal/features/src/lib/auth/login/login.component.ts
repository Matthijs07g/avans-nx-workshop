import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-nx-workshop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  subscription: Subscription | undefined = undefined;
  _id: string | null = null;
  emailadres = '';
  pass= '';
  errorMessage: string | undefined;
  

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService){}

  onSubmit(): void {
    // Basic validation
    if (!this.emailadres || !this.pass) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailadres)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.authService.login(this.emailadres, this.pass).subscribe({
      next: (results) => {
        console.log(`result: ${results}`);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else if (error.status === 404) {
          this.errorMessage = 'User not found';
        } else {
          this.errorMessage = 'Login failed. Please try again later';
        }
      }
    });
  }
}
