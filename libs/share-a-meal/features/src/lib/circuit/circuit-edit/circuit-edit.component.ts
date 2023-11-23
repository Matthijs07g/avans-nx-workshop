import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICircuit } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { CircuitService } from '../circuit.service';

@Component({
  selector: 'avans-nx-workshop-circuit-edit',
  templateUrl: './circuit-edit.component.html',
  styleUrls: ['./circuit-edit.component.css'],
})
export class CircuitEditComponent {
  circuit: ICircuit | null = null;
  subscription: Subscription | undefined = undefined;
  id: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private circuitService: CircuitService){}

  ngOnInit(): void {
    
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id != null){
      console.log(this.id)
      this.subscription = this.circuitService.read(this.id).subscribe((results) => {
        console.log(`results: ${results}`);
        this.circuit = results;
      });
    }
  }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }

  onSubmit() {
    // Here you can call your user service to update the user details
    // For demonstration purposes, you can log the updated user object
    console.log("User details updated:");
}
}

