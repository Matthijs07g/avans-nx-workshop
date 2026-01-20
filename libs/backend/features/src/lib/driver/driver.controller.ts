import { UpdateDriverDto } from '@avans-nx-workshop/backend/dto';
import { IDriver } from '@avans-nx-workshop/shared/api';
import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { DriverService } from './driver.service';

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

  @Post('')
  create(@Request() req : any): Promise<IDriver | null> {
    return this.driverService.create(req);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateDriverDto): Promise<IDriver | null> {
    return this.driverService.update(id, data)
  }

  @Delete(':id')
  del(@Param('id') id:string){
    return this.driverService.delete(id);
  }
}
