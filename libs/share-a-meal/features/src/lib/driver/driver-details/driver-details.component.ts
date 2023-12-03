import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDriver } from '@avans-nx-workshop/shared/api';
import { DriverService } from '../driver.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-nx-workshop-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.css'],
})
export class DriverDetailsComponent implements OnInit, OnDestroy{
driver: IDriver | null = null;
subscription: Subscription | undefined = undefined;
id: string | null = null;

constructor(private route: ActivatedRoute, private router: Router, private driverService: DriverService){}

ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.subscription = this.driverService.read(this.id).subscribe((results) => {
      console.log(`results: ${results}`);
      this.driver = results;

  });
}
ngOnDestroy(): void {
  if (this.subscription) this.subscription.unsubscribe();
}

del() : void {
  this.id = this.route.snapshot.paramMap.get('id');
  this.subscription = this.driverService.delete(this.id).subscribe((results) => {
    console.log(`result: ${results}`);
    this.router.navigate(['driver'])
  })
}
}
