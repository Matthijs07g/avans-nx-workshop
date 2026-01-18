import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ICircuit } from '@avans-nx-workshop/shared/api';
import { CreateCircuitDto, UpdateCircuitDto } from '@avans-nx-workshop/backend/dto';
import { CircuitService } from './circuit.service';
import { Public } from '../auth/decorators/decorators';
import { AdminGuard } from '../auth/admin.guard';

@Controller('circuit')
export class CircuitController {
    constructor(private circuitService: CircuitService) {}

  @Public()
  @Get('')
  getAll(): Promise<ICircuit[]> {
    return this.circuitService.getAll();
  }

  @Public()
  @Get(':id')
  getOne(@Param('id') id: string): Promise<ICircuit | null> {
    return this.circuitService.getOne(id);
  }

  @UseGuards(AdminGuard)
  @Post('')
  create(@Request() req : any): Promise<ICircuit | null> {
    return this.circuitService.create(req);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateCircuitDto): Promise<ICircuit | null> {
    return this.circuitService.update(id, data)
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  del(@Param('id') id:string){
    return this.circuitService.delete(id);
  }

}


