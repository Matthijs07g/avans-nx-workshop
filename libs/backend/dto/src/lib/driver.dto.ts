import {
    IsNotEmpty,
    IsString,
    IsNumber,
} from 'class-validator';
import {
    ICreateDriver,
    IUpdateDriver,
    IUpsertDriver,
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateDriverDto implements ICreateDriver {
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsNumber()
    @IsNotEmpty()
    country!: string;

    @IsString()
    @IsNotEmpty()
    birthdate!: string;

    @IsNumber()
    @IsNotEmpty()
    racewins!: number;

    @IsNumber()
    @IsNotEmpty()
    champion!: number;

    @IsString()
    @IsNotEmpty()
    timeActive!: string;

    @IsString()
    @IsNotEmpty()
    picture!: string;
}

export class UpsertDriverDto implements IUpsertDriver {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsNumber()
    @IsNotEmpty()
    country!: string;

    @IsString()
    @IsNotEmpty()
    birthdate!: string;

    @IsNumber()
    @IsNotEmpty()
    racewins!: number;

    @IsNumber()
    @IsNotEmpty()
    champion!: number;

    @IsString()
    @IsNotEmpty()
    timeActive!: string;

    @IsString()
    @IsNotEmpty()
    picture!: string;
}

export class UpdateDriverDto implements IUpdateDriver {
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsString()
    @IsNotEmpty()
    country!: string;

    @IsString()
    @IsNotEmpty()
    birthdate!: string;

    @IsNumber()
    @IsNotEmpty()
    racewins!: number;

    @IsNumber()
    @IsNotEmpty()
    champion!: number;

    @IsString()
    @IsNotEmpty()
    timeActive!: string;

    @IsString()
    @IsNotEmpty()
    picture!: string;
}
