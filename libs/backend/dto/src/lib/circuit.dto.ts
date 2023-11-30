import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate,
    IsArray,
    IsNumber,
} from 'class-validator';
import {
    ICreateCircuit,
    IUpdateCircuit,
    IUpsertCircuit,
    Roles
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateCircuitDto implements ICreateCircuit {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    location!: string;

    @IsNumber()
    @IsNotEmpty()
    length!: number;

    @IsString()
    @IsNotEmpty()
    mapIMG!: string;
}

export class UpsertCircuitDto implements IUpsertCircuit {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    location!: string;

    @IsNumber()
    @IsNotEmpty()
    length!: number;

    @IsString()
    @IsNotEmpty()
    mapIMG!: string;
}

export class UpdateCircuitDto implements IUpdateCircuit {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    location!: string;

    @IsNumber()
    @IsNotEmpty()
    length!: number;

    @IsString()
    @IsNotEmpty()
    mapIMG!: string;
}
