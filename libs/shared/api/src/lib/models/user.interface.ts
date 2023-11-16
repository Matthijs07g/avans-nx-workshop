import { Id } from './id.type';

export enum Roles {
    Guest = 'Guest',
    Admin = 'Admin',
    Owner = 'Owner'
}

// Voor nu is onze user een string; later zullen we hier een User object van maken.
type User = string;

export interface IUser {
    id: Id;
    firstName: string;
    lastName: string;
    picture: string;
    emailadres: string;
    birthdate: Date;
    role: Roles;
    pass: string;
    friends: User[]
}

export type ICreateUser = Pick<
    IUser,
    'firstName' | 'lastName' | 'picture' | 'emailadres' | 'pass' | 'birthdate'
>;
export type IUpdateUser = Partial<Omit<IUser, 'id'>>;
export type IUpsertUser = IUser;

