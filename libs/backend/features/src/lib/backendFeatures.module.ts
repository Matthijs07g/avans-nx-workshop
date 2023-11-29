import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { CircuitController } from './circuit/circuit.controller';
import { CircuitService } from './circuit/circuit.service';

@Module({
  controllers: [UserController, CircuitController],
  providers: [UserService, CircuitService],
  exports: [UserService, CircuitService],
})
export class backendFeaturesModule {}
