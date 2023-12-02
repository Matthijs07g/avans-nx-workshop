import { Component } from '@angular/core';
import { ITeam } from '@avans-nx-workshop/shared/api';
import { TeamService } from '../team.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css'],
})
export class TeamEditComponent {
  team: ITeam | null = null;
  subscription: Subscription | undefined = undefined;
  _id: string | null = null;
  Name = '';
  Owner= '';
  Country = '';
  ConstructorChampions = 0;
  iconIMG= '';
  Founded= '';
  

  constructor(private route: ActivatedRoute, private router: Router, private teamService: TeamService){}

  ngOnInit(): void {
    
    this._id = this.route.snapshot.paramMap.get('id');
    console.log(this._id)
    if(this._id != null){
      console.log(this._id)
      this.subscription = this.teamService.read(this._id).subscribe((results) => {
        console.log(`results: ${results}`);
        this.team = results;
      });
    }
  }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }

  onSubmit(): void {
    this._id = this.route.snapshot.paramMap.get('id');
    if(this._id == null){
      this.teamService.create(this.Name, this.Owner, this.Country, this.ConstructorChampions, this.iconIMG, this.Founded).subscribe((results) =>{
        console.log(`result: ${results}`);
        this.team = results;
        this.router.navigate(['/team']);
      })
      
    }else if(this._id !=null){
      this.teamService.update(this._id, this.team?.name, this.team?.owner, this.team?.country, this.team?.constructor_champions, this.team?.dateFounded, this.team?.iconImg).subscribe((results) =>{
        console.log(`result: ${results}`);
        this.router.navigate(['/team/'+this._id]);
      })
      
    }
}
}
