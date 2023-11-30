import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Request } from '@nestjs/common';
import { ICircuit } from '@avans-nx-workshop/shared/api';
import { CreateCircuitDto, UpdateCircuitDto } from '@avans-nx-workshop/backend/dto';
import { CircuitService } from './circuit.service';

@Controller('circuit')
export class CircuitController {
    constructor(private circuitService: CircuitService) {}

  @Get('')
  getAll(): Promise<ICircuit[]> {
    return this.circuitService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<ICircuit | null> {
    return this.circuitService.getOne(id);
  }

  @Post('')
  create(@Request() req : any): Promise<ICircuit | null> {
    return this.circuitService.create(req);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateCircuitDto): Promise<ICircuit | null> {
    return this.circuitService.update(id, data)
  }

  @Delete(':id')
  del(@Param('id') id:string){
    return this.circuitService.delete(id);
  }

}


