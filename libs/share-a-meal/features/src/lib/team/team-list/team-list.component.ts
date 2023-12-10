import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITeam } from '@avans-nx-workshop/shared/api';
import { TeamService } from '../team.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'avans-nx-workshop-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
})
export class TeamListComponent implements OnInit, OnDestroy{
  teams: ITeam[] | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(private teamService: TeamService, public authService: AuthService) {}

    ngOnInit(): void {
        this.subscription = this.teamService.list().subscribe((results) => {
            console.log(`results: ${results}`);
            this.teams = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
