import { AuthModule, backendFeaturesModule } from "@avans-nx-workshop/backend/features";
import { environment } from "@avans-nx-workshop/shared/util-env";
import { Logger, Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

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
        backendFeaturesModule,
        AuthModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
