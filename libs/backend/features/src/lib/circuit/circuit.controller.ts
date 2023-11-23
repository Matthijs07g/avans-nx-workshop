import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ICircuit } from '@avans-nx-workshop/shared/api';
import { CreateCircuitDto } from '@avans-nx-workshop/backend/dto';
import { CircuitService } from './circuit.service';

@Controller('circuit')
export class CircuitController {
    constructor(private circuitService: CircuitService) {}

  @Get('')
  getAll(): ICircuit[] {
    return this.circuitService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): ICircuit {
    return this.circuitService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateCircuitDto): ICircuit {
    return this.circuitService.create(data);
  }
}
