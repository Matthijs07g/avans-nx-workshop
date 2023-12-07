import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsOptional,
    IsDate,
    IsArray,
} from 'class-validator';
import {
    ICreateUser,
    IUpdateUser,
    IUpsertUser,
    Roles
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateUserDto implements ICreateUser {
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsString()
    @IsNotEmpty()
    picture!: string;

    @IsString()
    @IsNotEmpty()
    emailadres!: string;

    @IsString()
    @IsNotEmpty()
    pass!: string;

    @IsString()
    @IsNotEmpty()
    birthdate!: string;
}

export class UpsertUserDto implements IUpsertUser {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsString()
    @IsNotEmpty()
    picture!: string;

    @IsString()
    @IsNotEmpty()
    emailadres!: string;

    @IsString()
    @IsNotEmpty()
    role!: Roles.Unknown;

    @IsString()
    @IsNotEmpty()
    pass!: string;

    @IsString()
    @IsNotEmpty()
    birthdate!: string;

}

export class UpdateUserDto implements IUpdateUser {
    @IsString()
    @IsNotEmpty()
    firstName!: string;

    @IsString()
    @IsNotEmpty()
    lastName!: string;

    @IsString()
    @IsNotEmpty()
    picture!: string;

    @IsString()
    @IsNotEmpty()
    emailadres!: string;

    @IsString()
    @IsNotEmpty()
    pass!: string;

    @IsString()
    @IsNotEmpty()
    birthdate!: string;

    @IsString()
    @IsNotEmpty()
    role!: Roles;
}

export class AddFriendDto {
    @IsString()
    @IsNotEmpty()
    friendId!: string;
}