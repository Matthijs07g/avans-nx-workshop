import { AuthModule, backendFeaturesModule } from "@avans-nx-workshop/backend/features";
import { environment } from "@fst/shared/util-env";
import { Logger, Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { Neo4jModule, Neo4jScheme } from "nest-neo4j/dist";

@Module({
    imports: [
        //AuthModule,
        MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
            connectionFactory: (connection) => {
                connection.on('connected', () => {
                    // console.log('is connected');
                    Logger.verbose(
                        `Mongoose db connected to ${environment.MONGO_DB_CONNECTION_STRING}`
                    );
                });
                connection._events.connected();
                return connection;
            }
        }),
        Neo4jModule.forRoot({
            scheme : environment.NEO4J_SCHEME as Neo4jScheme,
            host: environment.NEO4J_HOST,
            port: environment.NEO4J_PORT,
            username: environment.NEO4J_USERNAME,
            password: environment.NEO4J_PASSWORD,
        }),
            backendFeaturesModule,
            AuthModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
