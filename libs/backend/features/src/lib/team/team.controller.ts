import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ITeam } from '@avans-nx-workshop/shared/api';
import { CreateTeamDto, UpdateTeamDto } from '@avans-nx-workshop/backend/dto';
import { TeamService } from './team.service';
import { Public } from '../auth/decorators/decorators';
import { AdminGuard } from '../auth/admin.guard';

@Controller('team')
export class TeamController {
    constructor(private teamService: TeamService) {}

  @Public()
  @Get('')
  getAll(): Promise<ITeam[]> {
    return this.teamService.getAll();
  }

  @Public()
  @Get(':id')
  getOne(@Param('id') id: string): Promise<ITeam | null> {
    return this.teamService.getOne(id);
  }

  @UseGuards(AdminGuard)
  @Post('')
  create(@Request() req : any): Promise<ITeam | null> {
    return this.teamService.create(req);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateTeamDto): Promise<ITeam | null> {
    return this.teamService.update(id, data)
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  del(@Param('id') id:string){
    return this.teamService.delete(id);
  }

}


