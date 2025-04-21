import { IBlog, SubjectType } from "@avans-nx-workshop/shared/api";
import { IsMongoId } from "class-validator";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog implements IBlog {
    @IsMongoId()
    _id!:string;

    @Prop({ required: true})
    owner!: string;

    @Prop({ required: true})
    title!: string;

    @Prop({ required: true, type: String, enum: ['circuit', 'team', 'user']})
    subjectType!: SubjectType;

    @Prop({ required: true})
    subjectId!: string;

    @Prop({ required: true})
    content!: string;

    @Prop({ required: true})
    datePosted!: string;

}

export const BlogSchema = SchemaFactory.createForClass(Blog)