import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICircuit } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { CircuitService } from '../circuit.service';

@Component({
  selector: 'avans-nx-workshop-circuit-details',
  templateUrl: './circuit-details.component.html',
  styleUrls: ['./circuit-details.component.css'],
})
export class CircuitDetailsComponent {
  circuit: ICircuit | null = null;
  subscription: Subscription | undefined = undefined;
id: string | null = null;

constructor(private route: ActivatedRoute, private router: Router, private circuitService: CircuitService){}

ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
    this.subscription = this.circuitService.read(this.id).subscribe((results) => {
      console.log(`results: ${results}`);
      this.circuit = results;
  });
}
}
