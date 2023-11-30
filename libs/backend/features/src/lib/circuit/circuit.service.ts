import { Injectable, NotFoundException } from '@nestjs/common';
import { ICircuit } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { error } from 'console';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CircuitDocument, Circuit as CircuitModel } from './circut.shema';
import { UpdateCircuitDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class CircuitService {
    TAG = 'CircuitService';

    constructor(
        @InjectModel(CircuitModel.name) private circuitModel: Model<CircuitDocument>
    ) {}


    async getAll(): Promise<ICircuit[]> {
        Logger.log('getAll', this.TAG);
        const items = await this.circuitModel
            .find()
            //.populate('Circuit', 'name location length mapIMG')  for references
            .exec();
        return items;
    }

    async getOne(_id: string): Promise<ICircuit | null> {
        Logger.log(`getOne(${_id})`, this.TAG);
        const item = await this.circuitModel.findOne({ _id }).exec();
        if(!item){
            Logger.debug('Circuit not found');
        }
        return item;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    async create(req: any): Promise<ICircuit | null> {
        Logger.log('create', this.TAG);
        const circuit = req.body;
        //const circuit_id = req.circuit.circuit_id     for authorisatie

        if(circuit){
            Logger.log(`Create Circuit ${circuit.name}`);
            const ceratedItem = {
                ...circuit
            };
            return this.circuitModel.create(ceratedItem);
        }
        return null;
    }

    async update(_id: string, circuit: UpdateCircuitDto): Promise<ICircuit | null> {
        Logger.log(`Update Circuit (${circuit.name})`, this.TAG);
        return this.circuitModel.findByIdAndUpdate({ _id }, circuit);

    }

    async delete(_id: string){
        Logger.log(`Delete Meal (${_id})`, this.TAG);
        return this.circuitModel.findByIdAndDelete({ _id });
    }
}
