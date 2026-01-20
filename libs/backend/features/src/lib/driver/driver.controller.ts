import { UpdateDriverDto } from '@avans-nx-workshop/backend/dto';
import { IDriver } from '@avans-nx-workshop/shared/api';
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { AuthGuard } from '../auth/auth.guards';
import { AdminGuard } from '../auth/admin.guard';

@Controller('driver')
export class DriverController {
    constructor(private driverService: DriverService) {}

  @Get('')
  getAll(): Promise<IDriver[]> {
    return this.driverService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<IDriver | null> {
    return this.driverService.getOne(id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Post('')
  create(@Request() req : any): Promise<IDriver | null> {
    return this.driverService.create(req);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateDriverDto): Promise<IDriver | null> {
    return this.driverService.update(id, data)
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Delete(':id')
  del(@Param('id') id:string){
    return this.driverService.delete(id);
  }
}
