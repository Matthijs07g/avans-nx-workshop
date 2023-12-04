import {
    IsNotEmpty,
    IsString,
    IsNumber,
} from 'class-validator';
import {
    ICreateBlog,
    IUpdateBlog,
    IUpsertBlog,
} from '@avans-nx-workshop/shared/api';

/**
 * Use the `Pick` utility type to extract only the properties we want for
 * new to-do items
 */
export class CreateBlogDto implements ICreateBlog {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    subject!: string;

    @IsNumber()
    @IsNotEmpty()
    content!: string;
}

export class UpsertBlogDto implements IUpsertBlog {
    @IsString()
    @IsNotEmpty()
    _id!: string;

    @IsString()
    @IsNotEmpty()
    owner!: string;

    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    subject!: string;

    @IsString()
    @IsNotEmpty()
    content!: string;

    @IsString()
    @IsNotEmpty()
    datePosted!: string;
}

export class UpdateBlogDto implements IUpdateBlog {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    subject!: string;

    @IsNumber()
    @IsNotEmpty()
    content!: string;
}
