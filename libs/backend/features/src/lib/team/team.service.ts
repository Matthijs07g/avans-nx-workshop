import { Injectable, NotFoundException } from '@nestjs/common';
import { ITeam } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { error } from 'console';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeamDocument, Team as TeamModel } from './team.schema';
import { UpdateTeamDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class TeamService {
    TAG = 'TeamService';

    constructor(
        @InjectModel(TeamModel.name) private teamModel: Model<TeamDocument>
    ) {}


    async getAll(): Promise<ITeam[]> {
        Logger.log('getAll', this.TAG);
        const items = await this.teamModel
            .find()
            //.populate('Team', 'name location length mapIMG')  for references
            .exec();
        return items;
    }

    async getOne(_id: string): Promise<ITeam | null> {
        Logger.log(`getOne(${_id})`, this.TAG);
        const item = await this.teamModel.findOne({ _id }).exec();
        if(!item){
            Logger.debug('Team not found');
        }
        return item;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    async create(req: any): Promise<ITeam | null> {
        Logger.log('create', this.TAG);
        const team = req.body;
        //const Team_id = req.Team.Team_id     for authorisatie

        if(team){
            Logger.log(`Create Circuit ${team.name}`);
            const ceratedItem = {
                ...team
            };
            return this.teamModel.create(ceratedItem);
        }
        return null;
    }

    async update(_id: string, circuit: UpdateTeamDto): Promise<ITeam | null> {
        Logger.log(`Update Circuit (${circuit.name})`, this.TAG);
        return this.teamModel.findByIdAndUpdate({ _id }, circuit);

    }

    async delete(_id: string){
        Logger.log(`Delete Meal (${_id})`, this.TAG);
        return this.teamModel.findByIdAndDelete({ _id });
    }
}
