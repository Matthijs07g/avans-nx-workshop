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
  Name = '';
  Locatie= '';
  Length = 0;
  mapIMG= '';
  

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

  onSubmit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id == null){
      this.circuitService.create(this.Name, this.Locatie, this.Length, this.mapIMG).subscribe((results) =>{
        console.log(`result: ${results}`);
        this.circuit = results;
        this.router.navigate(['/circuit']);
      })
      
    }else if(this.id !=null){
      this.circuitService.update(this.id, this.circuit?.name, this.circuit?.location, this.circuit?.length, this.circuit?.mapIMG).subscribe((results) =>{
        console.log(`result: ${results}`);
        this.router.navigate(['/circuit/'+this.id]);
      })
      
    }


    // Here you can call your user service to update the user details
    // For demonstration purposes, you can log the updated user object
    console.log("User details updated:");
}
}

