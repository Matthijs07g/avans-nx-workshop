import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDriver } from '@avans-nx-workshop/shared/api';
import { DriverService } from '../driver.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-nx-workshop-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css'],
})
export class DriverListComponent implements OnInit, OnDestroy{
  drivers: IDriver[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private driverService: DriverService) {}

  ngOnInit(): void {
      this.subscription = this.driverService.list().subscribe((results) => {
          console.log(`results: ${results}`);
          this.drivers = results;
        });
    }

  ngOnDestroy(): void {
      if (this.subscription) this.subscription.unsubscribe();
  }
}
