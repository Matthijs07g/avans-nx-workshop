import { Id } from './id.type';

// Voor nu is onze user een string; later zullen we hier een User object van maken.
//type User = string;

export interface IDriver {
    _id: Id;
    firstName: string;
    lastName: string;
    country: string;
    birthdate: string;
    racewins: number;
    champion: number;
    timeActive: string;
    picture: string;
}

export type ICreateDriver = Pick<
    IDriver,
    'firstName' | 'lastName' | 'country' | 'birthdate' | 'racewins' | 'champion' | 'timeActive' | 'picture'
>;
export type IUpdateDriver = Partial<Omit<IDriver, '_id'>>;
export type IUpsertDriver = IDriver;

