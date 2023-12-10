import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICircuit } from '@avans-nx-workshop/shared/api';
import { Subscription } from 'rxjs';
import { CircuitService } from '../circuit.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'avans-nx-workshop-circuit-list',
  templateUrl: './circuit-list.component.html',
  styleUrls: ['./circuit-list.component.css'],
})
export class CircuitListComponent implements OnInit, OnDestroy{
  circuits: ICircuit[] | null = null;
    subscription: Subscription | undefined = undefined;

    constructor(private circuitService: CircuitService, public authService: AuthService) {}

    ngOnInit(): void {
        this.subscription = this.circuitService.list().subscribe((results) => {
            console.log(`results: ${results}`);
            this.circuits = results;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) this.subscription.unsubscribe();
    }
}
