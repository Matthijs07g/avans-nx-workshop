import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'avans-nx-workshop-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {

  user: IUser | null = null;
  subscription: Subscription | undefined = undefined;
  id: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService){}

  ngOnInit(): void {
    
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != null){
      console.log(this.id)
      this.subscription = this.userService.read(this.id).subscribe((results) => {
        console.log(`results: ${results}`);
        this.user = results;
      });
    }
  }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }

  onSubmit() {
    // Here you can call your user service to update the user details
    // For demonstration purposes, you can log the updated user object
    console.log("User details updated:");
  }
}
