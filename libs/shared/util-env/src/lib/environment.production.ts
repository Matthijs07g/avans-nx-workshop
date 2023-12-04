import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
    production: true,
    apiUrl: 'https://avans-nx-matthijs.azurewebsites.net/api/',
    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://Guest:82cvM6Ykf7Augf2@f1blogger.pilbua3.mongodb.net/?retryWrites=true&w=majority',
    NEO4J_SCHEME: 'Client-Side',
    NEO4J_HOST: '',
    NEO4J_PORT: '',
    NEO4J_USERNAME: '',
    NEO4J_PASSWORD: '',
    NEO4J_DATABASE: '',
}