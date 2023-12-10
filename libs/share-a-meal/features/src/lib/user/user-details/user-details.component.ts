import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser, Roles } from '@avans-nx-workshop/shared/api';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'avans-nx-workshop-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: IUser | null = null;
    subscription: Subscription | undefined = undefined;
  id: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService, public authService: AuthService){}

  ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      console.log(this.id)
      this.subscription = this.userService.read(this.id).subscribe((results) => {
        console.log(`results: ${results}`);
        this.user = results;
    });
  }
  del() : void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.userService.delete(this.id).subscribe((results) => {
      console.log(`result: ${results}`);
      this.router.navigate(['user'])
    })
  }
}
