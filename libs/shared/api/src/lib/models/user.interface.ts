import { Id } from './id.type';

export enum Roles {
    Guest = 'Guest',
    Admin = 'Admin',
    Owner = 'Owner'
}

export interface IUser {
    id: Id;
    firstName: string;
    lastName: string;
    picture: string;
    emailadres: string;
    birthdate: string;
    role: Roles;
    pass: string;
    friends: string[];
    blogs: string[];
}

export type ICreateUser = Pick<
    IUser,
    'firstName' | 'lastName' | 'picture' | 'emailadres' | 'pass' | 'birthdate'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;

