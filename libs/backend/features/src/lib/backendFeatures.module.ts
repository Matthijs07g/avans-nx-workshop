import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { CircuitController } from './circuit/circuit.controller';
import { CircuitService } from './circuit/circuit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CricuitSchema, Circuit as CircuitModel } from './circuit/circut.shema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CircuitModel.name, schema: CricuitSchema}
    ])
  ],
  controllers: [UserController, CircuitController],
  providers: [UserService, CircuitService],
  exports: [UserService, CircuitService],
})
export class backendFeaturesModule {}
