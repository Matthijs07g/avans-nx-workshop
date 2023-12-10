import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICircuit } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { CircuitService } from '../circuit.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'avans-nx-workshop-circuit-details',
  templateUrl: './circuit-details.component.html',
  styleUrls: ['./circuit-details.component.css'],
})
export class CircuitDetailsComponent implements OnInit, OnDestroy{
  circuit: ICircuit | null = null;
  subscription: Subscription | undefined = undefined;
id: string | null = null;

constructor(private route: ActivatedRoute, private router: Router, private circuitService: CircuitService, public authService: AuthService){}

ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.subscription = this.circuitService.read(this.id).subscribe((results) => {
      console.log(`results: ${results}`);
      this.circuit = results;

  });
}
ngOnDestroy(): void {
  if (this.subscription) this.subscription.unsubscribe();
}

del() : void {
  this.id = this.route.snapshot.paramMap.get('id');
  this.subscription = this.circuitService.delete(this.id).subscribe((results) => {
    console.log(`result: ${results}`);
    this.router.navigate(['circuit'])
  })
}
}
