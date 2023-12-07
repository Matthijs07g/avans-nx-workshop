import { IUser, Roles } from "@avans-nx-workshop/shared/api";
import { IsMongoId } from "class-validator";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User implements IUser {
    @IsMongoId()
    _id!:string;

    @Prop({ required: true, type: String})
    firstName!: string;

    @Prop({ required: true, type: String})
    lastName!: string;

    @Prop({ required: true, type: String })
    picture!: string;

    @Prop({ required: true, type: String })
    emailadres!: string;

    @Prop({ required: true, type: String })
    birthdate!: string;

    @Prop({ required: true, type: String, default: Roles.Guest})
    role: Roles = Roles.Guest;

    @Prop({ required: true})
    pass!: string;
}

export const UserSchema = SchemaFactory.createForClass(User)