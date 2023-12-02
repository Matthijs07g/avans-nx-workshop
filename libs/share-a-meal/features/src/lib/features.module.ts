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
import { CircuitListComponent } from './circuit/circuit-list/circuit-list.component';
import { CircuitDetailsComponent } from './circuit/circuit-details/circuit-details.component';
import { CircuitEditComponent } from './circuit/circuit-edit/circuit-edit.component';
import { CircuitService } from './circuit/circuit.service';
import { TeamListComponent } from './team/team-list/team-list.component';
import { TeamEditComponent } from './team/team-edit/team-edit.component';
import { TeamDetailsComponent } from './team/team-details/team-details.component';
import { TeamService } from './team/team.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterLink, FormsModule],
  declarations: [
    MealListComponent,
    MealDetailComponent,
    AboutPageComponent,
    UserListComponent,
    UserDetailsComponent,
    UserEditComponent,
    CircuitListComponent,
    CircuitDetailsComponent,
    CircuitEditComponent,
    TeamListComponent,
    TeamEditComponent,
    TeamDetailsComponent,
  ],
  providers: [MealService, UserService, CircuitService, TeamService],
  exports: [
    MealListComponent,
    MealDetailComponent,
    AboutPageComponent,
    UserDetailsComponent,
    UserEditComponent,
    UserListComponent,
    CircuitListComponent,
    CircuitDetailsComponent,
    CircuitEditComponent,
    TeamListComponent,
    TeamEditComponent,
    TeamDetailsComponent
  ],
})
export class FeaturesModule {}
