import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { CircuitController } from './circuit/circuit.controller';
import { CircuitService } from './circuit/circuit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CircuitSchema, Circuit as CircuitModel } from './circuit/circut.shema';
import { TeamController } from './team/team.controller';
import { TeamSchema, Team as TeamModel } from './team/team.schema';
import { TeamService } from './team/team.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CircuitModel.name, schema: CircuitSchema },
      { name: TeamModel.name, schema: TeamSchema}
    ]),
  ],
  controllers: [UserController, CircuitController, TeamController],
  providers: [UserService, CircuitService, TeamService],
  exports: [UserService, CircuitService, TeamService],
})
export class backendFeaturesModule {}
