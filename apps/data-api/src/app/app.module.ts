import { backendFeaturesModule } from "@avans-nx-workshop/backend/features";
import { environment } from "@fst/shared/util-env";
import { Logger, Module } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        backendFeaturesModule,
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
        backendFeaturesModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}