import { Id } from './id.type';

// Voor nu is onze user een string; later zullen we hier een User object van maken.
//type User = string;

export interface IBlog {
    _id: Id;
    owner: Id;
    title: string;
    subject: string;
    content: string;
    datePosted: string;
}

export type ICreateBlog = Pick<
    IBlog,
    'title' | 'subject' | 'content'
>;
export type IUpdateBlog = Partial<Omit<IBlog, '_id'>>;
export type IUpsertBlog = IBlog;

