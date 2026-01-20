import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ITeam } from '@avans-nx-workshop/shared/api';
import { CreateTeamDto, UpdateTeamDto } from '@avans-nx-workshop/backend/dto';
import { TeamService } from './team.service';
import { AuthGuard } from '../auth/auth.guards';
import { AdminGuard } from '../auth/admin.guard';

@Controller('team')
export class TeamController {
    constructor(private teamService: TeamService) {}

  @Get('')
  getAll(): Promise<ITeam[]> {
    return this.teamService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<ITeam | null> {
    return this.teamService.getOne(id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Post('')
  create(@Request() req : any): Promise<ITeam | null> {
    return this.teamService.create(req);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateTeamDto): Promise<ITeam | null> {
    return this.teamService.update(id, data)
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  del(@Param('id') id:string){
    return this.teamService.delete(id);
  }

}


