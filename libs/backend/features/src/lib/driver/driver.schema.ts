import { IDriver, ITeam } from "@avans-nx-workshop/shared/api";
import { IsMongoId } from "class-validator";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type DriverDocument = Driver & Document;

@Schema()
export class Driver implements IDriver {
    @IsMongoId()
    _id!:string;

    @Prop({ required: true})
    firstName!: string;

    @Prop({ required: true})
    lastName!: string;

    @Prop({ required: true })
    country!: string;

    @Prop({ required: true})
    birthdate!: string;

    @Prop({ required: true, type: Object})
    team!: ITeam;

    @Prop({ required: true})
    racewins!: number;

    @Prop({ required: true})
    champion!: number;

    @Prop({ required: true })
    timeActive!: string;

    @Prop({ required: true })
    picture!: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver)