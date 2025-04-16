import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserIdentity } from '@avans-nx-workshop/shared/api';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AuthService } from 'libs/share-a-meal/features/src/lib/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'avans-nx-workshop-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {

  loggedInUser$: Observable<IUserIdentity | undefined> | undefined;

  constructor(private authService: AuthService, private router: Router){}
  
  ngOnInit(): void {
      this.loggedInUser$ = this.authService.currentUser$
  }

  logOut(): void {
    console.log('loguit called')
    this.authService.removeFromLocalStorage();
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
  }
}
