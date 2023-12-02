import { ITeam, IResourceId } from "@avans-nx-workshop/shared/api";
import { IsMongoId } from "class-validator";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class Team implements ITeam {
    @IsMongoId()
    _id!:string;

    @Prop({ required: true})
    name!: string;

    @Prop({ required: true})
    owner!: string;

    @Prop({ required: true })
    country!: string;

    @Prop({ required: true})
    constructor_champions!: number;

    @Prop({ required: true})
    dateFounded!: string;

    @Prop({ required: true})
    iconImg!: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team)