import { Id } from './id.type';

export enum Roles {
    Guest = 'Guest',
    Admin = 'Admin',
    Owner = 'Owner',
    Unknown = 'Unknown'
}

export interface IUser {
    _id: Id;
    firstName: string;
    lastName: string;
    picture: string;
    emailadres: string;
    birthdate: string;
    role: Roles;
    pass: string;
}

export interface IUserIdentity {
    firstName: string;
    lastName: string;
    emailadres: string;
    picture: string;
    role: Roles;
    token?: string;
}



export type ICreateUser = Pick<
    IUser,
    'firstName' | 'lastName' | 'picture' | 'emailadres' | 'pass' | 'birthdate'
>;
export type IUpdateUser = Partial<Omit<IUser, '_id'>>;
export type IUpsertUser = IUser;

