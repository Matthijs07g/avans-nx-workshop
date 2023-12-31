import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service'
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'avans-nx-workshop-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy{
  users: IUser[] | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(private userService: UserService, public authService: AuthService) {}

    ngOnInit(): void {
        this.subscription = this.userService.list().subscribe((results) => {
            console.log(`results: ${results}`);
            this.users = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
