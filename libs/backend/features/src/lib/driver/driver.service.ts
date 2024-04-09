import { Injectable, NotFoundException } from '@nestjs/common';
import { IDriver } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { error } from 'console';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DriverDocument, Driver as DriverModel } from './driver.schema';
import { UpdateDriverDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class DriverService {
    TAG = 'DriverService';

    constructor(
        @InjectModel(DriverModel.name) private driverModel: Model<DriverDocument>
    ) {}


    async getAll(): Promise<IDriver[]> {
        Logger.log('getAll', this.TAG);
        const items = await this.driverModel
            .find()
            //.populate('Team', 'name location length mapIMG')  for references
            .exec();
        return items;
    }

    async getOne(_id: string): Promise<IDriver | null> {
        Logger.log(`getOne(${_id})`, this.TAG);
        const item = await this.driverModel.findOne({ _id }).exec();
        if(!item){
            Logger.debug('driver not found');
        }
        return item;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    async create(req: any): Promise<IDriver | null> {
        Logger.log('create', this.TAG);
        const driver = req.body;
        console.log(req.body)
        //const Team_id = req.Team.Team_id     for authorisatie

        if(driver){
            Logger.log(`Create Driver ${driver.firstName}`);
            const createdItem = {
                ...driver
            };
            return this.driverModel.create(createdItem);
        }
        return null;
    }

    async update(_id: string, driver: UpdateDriverDto): Promise<IDriver | null> {
        Logger.log(`backend Update driver (${driver.firstName})`, this.TAG);
        return this.driverModel.findByIdAndUpdate({ _id }, driver);

    }

    async delete(_id: string){
        Logger.log(`Delete driver (${_id})`, this.TAG);
        return this.driverModel.findByIdAndDelete({ _id });
    }
}
