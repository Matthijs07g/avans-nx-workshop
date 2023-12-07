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
import { DriverController } from './driver/driver.controller';
import { DriverSchema, Driver as DriverModel } from './driver/driver.schema';
import { DriverService } from './driver/driver.service';
import { UserSchema, User as UserModel } from './user/user.schema';
import { BlogController } from './blog/blog.controller';
import { BlogSchema, Blog as BlogModel } from './blog/blog.schema';
import { BlogService } from './blog/blog.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CircuitModel.name, schema: CircuitSchema },
      { name: TeamModel.name, schema: TeamSchema },
      { name: DriverModel.name, schema: DriverSchema },
      { name: UserModel.name, schema: UserSchema },
      { name: BlogModel.name, schema: BlogSchema }
    ]),
  ],
  controllers: [
    UserController,
    CircuitController,
    TeamController,
    DriverController,
    BlogController,
  ],
  providers: [UserService, CircuitService, TeamService, DriverService, BlogService],
  exports: [UserService, CircuitService, TeamService, DriverService, BlogService],
})
export class backendFeaturesModule {}
