import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealListComponent } from './meal/meal-list/meal-list.component';
import { MealDetailComponent } from './meal/meal-detail/meal-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { MealService } from './meal/meal.service';
import { AboutPageComponent } from './about/about-page.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserService } from './user/user.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule],
  declarations: [
    MealListComponent,
    MealDetailComponent,
    AboutPageComponent,
    UserListComponent,
    UserDetailsComponent,
    UserEditComponent,
  ],
  providers: [MealService, UserService],
  exports: [
    MealListComponent, 
    MealDetailComponent, 
    AboutPageComponent, 
    UserDetailsComponent, 
    UserEditComponent, 
    UserListComponent],
})
export class FeaturesModule {}
