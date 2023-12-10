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

  constructor(private router: Router, private authService: AuthService){}

  onSubmit(): void {
      this.authService.register(this.Firstname, this.Lastname, this.PictureUrl, this.Email, this.passWord, this.birthday).subscribe((results) =>{
        console.log(`result: ${results}`);
        this.user = results;
        this.router.navigate(['/user/'+this.user._id]);
      })
  }
} 
