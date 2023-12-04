import { Id } from './id.type';

// Voor nu is onze user een string; later zullen we hier een User object van maken.
//type User = string;

export interface ICircuit {
    _id: Id;
    name: string;
    location: string;
    length: number;
    mapIMG: string;
}

export type ICreateCircuit = Pick<
    ICircuit,
    'name' | 'location' | 'length' | 'mapIMG'
>;
export type IUpdateCircuit = Partial<Omit<ICircuit, 'id'>>;
export type IUpsertCircuit = ICircuit;

