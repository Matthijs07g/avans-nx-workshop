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
    this.authService.login(this.emailadres, this.pass).subscribe({
        next: (results) => {
            console.log(`result: ${results}`);
            this.router.navigate(['/dashboard']);
        },
        error: (error) => {
            console.error('Login failed:', error);
            // Here you can add code to show an error message to the user
            // For example, you could have an error message property:
            this.errorMessage = 'Invalid email or password';
        }
    });
  }
}
