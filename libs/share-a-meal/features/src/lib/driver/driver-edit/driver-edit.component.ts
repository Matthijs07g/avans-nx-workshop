import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDriver } from '@avans-nx-workshop/shared/api';
import { DriverService } from '../driver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-nx-workshop-driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.css'],
})
export class DriverEditComponent implements OnInit, OnDestroy {
  driver: IDriver | null = null;
  subscription: Subscription | undefined = undefined;
  _id: string | null = null;
  firstName = '';
  lastName= '';
  Country = '';
  birthdate = '';
  racewins= 0;
  champion= 0;
  timeActive = '';
  picture = '';
  

  constructor(private route: ActivatedRoute, private router: Router, private driverService: DriverService){}

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
  }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }

  onSubmit(): void {
    this._id = this.route.snapshot.paramMap.get('id');
    if(this._id == null){
      this.driverService.create(this.firstName, this.lastName, this.Country, this.birthdate, this.racewins, this.champion, this.timeActive, this.picture).subscribe((results) =>{
        console.log(`result: ${results}`);
        this.driver = results;
        this.router.navigate(['/driver']);
      })
      
    }else if(this._id !=null){
      this.driverService.update(this._id, this.driver?.firstName, this.driver?.lastName, this.driver?.country, this.driver?.birthdate, this.driver?.racewins, this.driver?.champion, this.driver?.timeActive, this.driver?.picture).subscribe((results) =>{
        console.log(`result: ${results}`);
        this.router.navigate(['/driver/'+this._id]);
      })
      
    }
}
}

