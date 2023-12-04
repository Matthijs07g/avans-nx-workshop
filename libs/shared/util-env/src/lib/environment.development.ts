import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
    production: false,
    apiUrl: 'http://localhost:3000/api/',
    MONGO_DB_CONNECTION_STRING: 'mongodb://127.0.0.1:27017/F1Blogger',
    NEO4J_SCHEME: 'Client-Side',
    NEO4J_HOST: 'localhost',
    NEO4J_PORT: '7687',
    NEO4J_USERNAME: 'neo4j',
    NEO4J_PASSWORD: '',
    NEO4J_DATABASE: 'F1BloggerUsers',
}