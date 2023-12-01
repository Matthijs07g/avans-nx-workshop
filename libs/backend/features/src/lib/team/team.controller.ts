import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Request } from '@nestjs/common';
import { ITeam } from '@avans-nx-workshop/shared/api';
import { CreateTeamDto, UpdateTeamDto } from '@avans-nx-workshop/backend/dto';
import { TeamService } from './team.service';

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

  @Post('')
  create(@Request() req : any): Promise<ITeam | null> {
    return this.teamService.create(req);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateTeamDto): Promise<ITeam | null> {
    return this.teamService.update(id, data)
  }

  @Delete(':id')
  del(@Param('id') id:string){
    return this.teamService.delete(id);
  }

}


