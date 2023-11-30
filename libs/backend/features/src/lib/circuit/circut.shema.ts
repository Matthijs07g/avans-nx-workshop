import { ICircuit, IResourceId } from "@avans-nx-workshop/shared/api";
import { IsMongoId } from "class-validator";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CircuitDocument = Circuit & Document;

@Schema()
export class Circuit implements ICircuit {
    @IsMongoId()
    _id!:string;

    @Prop({ required: true})
    name!: string;

    @Prop({ required: true})
    location!: string;

    @Prop({ required: true})
    length!: number;

    @Prop({ required: true})
    mapIMG!: string;
}

export const CricuitSchema = SchemaFactory.createForClass(Circuit)