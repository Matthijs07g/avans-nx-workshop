import { DotenvParseOutput, parse } from 'dotenv';

// Use 'string' as the type for process.env
const env = parse(process.env as unknown as string) as DotenvParseOutput;

export const environment = {
  production: true,
  apiEndpoint: env['API_ENDPOINT'] || 'avans-nx-matthijs.azurewebsites.net',
};
