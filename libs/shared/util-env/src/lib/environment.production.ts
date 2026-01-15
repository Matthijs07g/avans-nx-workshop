import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
    production: true,
    apiUrl: 'https://101010-matthijs-2-data-api.container.tilaa.cloud/api/',
    MONGO_DB_CONNECTION_STRING: 'mongodb+srv://Guest:82cvM6Ykf7Augf2@f1blogger.itow09w.mongodb.net/?retryWrites=true&w=majority&appName=F1Blogger',
    // NEO4J_SCHEME: 'neo4j+s',
    // NEO4J_HOST: 'f23c0173.databases.neo4j.io',
    // NEO4J_PORT: '7687',
    // NEO4J_USERNAME: 'neo4j',
    // NEO4J_PASSWORD: 'fy5LPDHxXLhyfjn_FO2rPImjGh8X467o1v7iuZovgJU',
    // NEO4J_DATABASE: 'F1BloggerUsers',
}