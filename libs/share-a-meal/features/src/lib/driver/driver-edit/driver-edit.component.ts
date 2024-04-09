import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDriver, ITeam } from '@avans-nx-workshop/shared/api';
import { DriverService } from '../driver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, delay } from 'rxjs';
import { TeamService } from '../../team/team.service';

@Component({
  selector: 'avans-nx-workshop-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.css'],
})
export class DriverEditComponent implements OnInit, OnDestroy {
  driver: IDriver | null = null;
  subscription: Subscription | undefined = undefined;
  _id: string | null = null;
  teams: ITeam[] = [];
  firstName = '';
  lastName= '';
  Country = '';
  birthdate = '';
  teamName = '';
  team!: ITeam;
  racewins= 0;
  champion= 0;
  timeActive = '';
  picture = '';
  

  constructor(private route: ActivatedRoute, private router: Router, private driverService: DriverService, private teamService: TeamService){}

  ngOnInit(): void {
    
    this._id = this.route.snapshot.paramMap.get('id');
    console.log(this._id)
    if(this._id != null){
      console.log(this._id)
      this.subscription = this.driverService.read(this._id).subscribe((results) => {
        console.log(`results: ${results}`);
        this.driver = results;
      });
    }

    const teamList = this.teamService.list();
      teamList.forEach(element => {
        if(element)
        element.forEach(X => {
          this.teams.push(X);
        });
      });
  }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }

  onSubmit(): void {
    this._id = this.route.snapshot.paramMap.get('id');

    if(this._id == null){
      this.checkTeam(this.teamName)    
    .then(team => {
        this.team = team
        console.log('Team:', team);

        this.driverService.create(this.firstName, this.lastName, this.Country, this.birthdate, this.team, this.racewins, this.champion, this.timeActive, this.picture).subscribe((results) =>{
          console.log(`result: ${results}`);
          this.driver = results;
          this.router.navigate(['/driver']);
        })
    })
    .catch(error => {
        // Handle the error
        console.error('Error:', error);
    });


      
    }else if(this._id !=null){
      this.driverService.update(this._id, this.driver?.firstName, this.driver?.lastName, this.driver?.country, this.driver?.birthdate, this.driver?.team, this.driver?.racewins, this.driver?.champion, this.driver?.timeActive, this.driver?.picture).subscribe((results) =>{
        console.log(`result: ${results}`);
        this.router.navigate(['/driver/'+this._id]);
      })
    }
  }

  checkTeam(name: string): Promise<ITeam> {
    return new Promise((resolve, reject) => {
        const teams: ITeam[] = [];
        let team: ITeam | null = null;

        this.subscription = this.teamService.list().subscribe((results) => {
            results?.forEach(element => {
                teams.push(element);
            });

            teams.forEach(element => {
                console.log(element.name + "==========" + name);
                if (element.name === name) { 
                    team = element;
                }
            });

            if (!team) {
                reject(new Error(`${name} not found`));
            } else {
                resolve(team);
            }
        });
    });
}

}

