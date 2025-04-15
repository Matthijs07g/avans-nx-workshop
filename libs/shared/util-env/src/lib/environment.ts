import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/',
  MONGO_DB_CONNECTION_STRING: 'mongodb+srv://Guest:82cvM6Ykf7Augf2@f1blogger.itow09w.mongodb.net/?retryWrites=true&w=majority&appName=F1Blogger',
  NEO4J_SCHEME: 'neo4j',
  NEO4J_HOST: 'localhost',
  NEO4J_PORT: '7687',
  NEO4J_USERNAME: 'neo4j',
  NEO4J_PASSWORD: 'guest',
  NEO4J_DATABASE: 'F1BloggerUsers'
}