export interface IEnvironment {
    production: boolean;
    apiUrl: string;
    MONGO_DB_CONNECTION_STRING: string;
    NEO4J_SCHEME : string;
    NEO4J_HOST: string;
    NEO4J_PORT: string;
    NEO4J_USERNAME: string;
    NEO4J_PASSWORD: string;
    NEO4J_DATABASE: string;
}