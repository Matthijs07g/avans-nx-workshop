import { UpdateDriverDto } from '@avans-nx-workshop/backend/dto';
import { IDriver } from '@avans-nx-workshop/shared/api';
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { DriverService } from './driver.service';
import { Public } from '../auth/decorators/decorators';
import { AdminGuard } from '../auth/admin.guard';

@Controller('driver')
export class DriverController {
    constructor(private driverService: DriverService) {}

  @Public()
  @Get('')
  getAll(): Promise<IDriver[]> {
    return this.driverService.getAll();
  }

  @Public()
  @Get(':id')
  getOne(@Param('id') id: string): Promise<IDriver | null> {
    return this.driverService.getOne(id);
  }

  @UseGuards(AdminGuard)
  @Post('')
  create(@Request() req : any): Promise<IDriver | null> {
    return this.driverService.create(req);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateDriverDto): Promise<IDriver | null> {
    return this.driverService.update(id, data)
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  del(@Param('id') id:string){
    return this.driverService.delete(id);
  }
}
