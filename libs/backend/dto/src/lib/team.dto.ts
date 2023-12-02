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
    ICreateTeam,
    IUpdateTeam,
    IUpsertTeam,
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateTeamDto implements ICreateTeam {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    owner!: string;

    @IsString()
    @IsNotEmpty()
    country!: string;

    @IsNumber()
    @IsNotEmpty()
    constructor_champions!: number;

    @IsString()
    @IsNotEmpty()
    dateFounded!: string;

    @IsString()
    @IsNotEmpty()
    iconImg!: string;
}

export class UpsertTeamDto implements IUpsertTeam {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    owner!: string;

    @IsString()
    @IsNotEmpty()
    country!: string;

    @IsNumber()
    @IsNotEmpty()
    constructor_champions!: number;

    @IsString()
    @IsNotEmpty()
    dateFounded!: string;

    @IsString()
    @IsNotEmpty()
    iconImg!: string;
}

export class UpdateTeamDto implements IUpdateTeam {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    owner!: string;

    @IsString()
    @IsNotEmpty()
    country!: string;

    @IsNumber()
    @IsNotEmpty()
    constructor_champions!: number;

    @IsString()
    @IsNotEmpty()
    dateFounded!: string;

    @IsString()
    @IsNotEmpty()
    iconImg!: string;
}
