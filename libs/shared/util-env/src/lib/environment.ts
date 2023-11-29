import { IEnvironment } from "./environment.interface";

export const environment: IEnvironment = {
  production: false,
  apiUrl: 'http://localhost:3000/api/',
  MONGO_DB_CONNECTION_STRING: 'mongodb://127.0.0.1:27017/F1Blogger'
}