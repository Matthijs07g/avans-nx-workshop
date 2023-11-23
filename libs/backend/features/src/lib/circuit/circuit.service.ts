import { Injectable, NotFoundException } from '@nestjs/common';
import { ICircuit } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { error } from 'console';

@Injectable()
export class CircuitService {
    TAG = 'CircuitService';

    private circuits$ = new BehaviorSubject<ICircuit[]>([
        {
            id: '0',
            name: 'CM.com Circuit Zandvoort',
            location: 'Zandvoort, Nederland',
            length: 4259,
            mapIMG: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Zandvoort_Circuit.png/1024px-Zandvoort_Circuit.png'
        },
        {
            id: '1',
            name: 'Circuit de Spa-Francorchamps',
            location: 'Stavelot, België',
            length: 7004,
            mapIMG: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Circuit_Spa_2007.png'
        },
        {
            id: '2',
            name: 'Autodromo Nazionale Monza',
            location: 'Monza, Italië',
            length: 5793,
            mapIMG: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Monza_track_map.svg/1920px-Monza_track_map.svg.png'
        },
        {
            id: '3',
            name: 'Yas Marina Circuit',
            location: 'Yas, Verenigde Arabische Emiraten',
            length: 5281,
            mapIMG: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Yas_Marina_Circuit.png/1920px-Yas_Marina_Circuit.png'
        },
        {
            id: '4',
            name: 'Autódromo José Carlos Pace',
            location: 'São Paulo, Brazillië',
            length: 4309,
            mapIMG: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Circuit_Interlagos.svg/1024px-Circuit_Interlagos.svg.png'
        },
    ]);

    getAll(): ICircuit[] {
        Logger.log('getAll', this.TAG);
        return this.circuits$.value;
    }

    getOne(id: string): ICircuit {
        Logger.log(`getOne(${id})`, this.TAG);
        const circuit = this.circuits$.value.find((td) => td.id === id);
        if (!circuit) {
            throw new NotFoundException(`User could not be found!`);
        }
        return circuit;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(circuit: Pick<ICircuit, 'name' | 'location' | 'length' | 'mapIMG' >): ICircuit {
        Logger.log('create', this.TAG);
        const current = this.circuits$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newCircuit: ICircuit = {
            id: `circuit-${Math.floor(Math.random() * 10000)}`,
            ...circuit
            
        };
        this.circuits$.next([...current, newCircuit]);
        return newCircuit;
    }

    update(id: string, circuit: Pick<ICircuit, 'name' | 'location' | 'length' | 'mapIMG' >): ICircuit {
        Logger.log(`Update(${id})`, this.TAG);
        let check = null
        const current = this.circuits$.value;
        const newCircuit: ICircuit = {
            id: id,
            ...circuit
        };
        current.forEach(circuit => {
            if(circuit.id == newCircuit.id){
                circuit.name = newCircuit.name;
                circuit.location = newCircuit.location;
                circuit.length = newCircuit.length;
                circuit.mapIMG = newCircuit.mapIMG;
                check = circuit
            }
        });
        if(!check){
            throw new NotFoundException('Circuit not found')
        }
        return newCircuit;
    }

    delete(id: string): ICircuit{
        Logger.log(`Delete(${id})`, this.TAG);
        console.log(id)
        const circuit = this.circuits$.value.find((td) => td.id === id);
        if (!circuit) {
            throw new NotFoundException(`User could not be found!`);
        }
        const circuits = this.circuits$.value
        const updatedCircuits = circuits.filter(circuit => circuit.id !== id);
        this.circuits$.next(updatedCircuits);
        return circuit;
    








        // const target = this.circuits$.value.find((td) => td.id === id);
        // const circuits = this.circuits$.value
        // const newList = new BehaviorSubject<ICircuit[]>([]);
        
        
        // for (let i = 0; i < circuits.length; i++) {
            
        //     if(target != circuits[i]){
        //         // console.log(target);
        //         // console.log('============================');
        //         // console.log(circuits[i]);
        //         const current = newList.value
        //         newList.next([...current, circuits[i]])
        //     }
            
        // }
        // this.circuits$ = newList;
        // return target;
        
    }
}
