import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITeam } from '@avans-nx-workshop/shared/api';
import { TeamService } from '../team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-nx-workshop-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css'],
})
export class TeamDetailsComponent implements OnInit, OnDestroy{
  team: ITeam | null = null;
  subscription: Subscription | undefined = undefined;
id: string | null = null;

constructor(private route: ActivatedRoute, private router: Router, private teamService: TeamService){}

ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.subscription = this.teamService.read(this.id).subscribe((results) => {
      console.log(`results: ${results}`);
      this.team = results;

  });
}
ngOnDestroy(): void {
  if (this.subscription) this.subscription.unsubscribe();
}

del() : void {
  this.id = this.route.snapshot.paramMap.get('id');
  this.subscription = this.teamService.delete(this.id).subscribe((results) => {
    console.log(`result: ${results}`);
    this.router.navigate(['team'])
  })
}
}
