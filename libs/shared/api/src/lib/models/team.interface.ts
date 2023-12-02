import { Id } from './id.type';

// Voor nu is onze user een string; later zullen we hier een User object van maken.
//type User = string;

export interface ITeam {
    _id: Id;
    name: string;
    owner: string;
    country: string;
    constructor_champions: number;
    dateFounded: string;
    iconImg: string;
}

export type ICreateTeam = Pick<
    ITeam,
    'name' | 'owner' | 'country' | 'constructor_champions' | 'dateFounded' | 'iconImg'
>;
export type IUpdateTeam = Partial<Omit<ITeam, '_id'>>;
export type IUpsertTeam = ITeam;

