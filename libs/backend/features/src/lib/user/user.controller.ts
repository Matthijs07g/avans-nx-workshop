import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from '@avans-nx-workshop/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

  @Get('')
  getAll(): IUser[] {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): IUser {
    return this.userService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateUserDto): IUser {
    return this.userService.create(data);
  }

  @Put(':id')
  update(@Param('id') id:string, @Body() data: UpdateUserDto): IUser {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  del(@Param('id') id:string): IUser {
    return this.userService.delete(id)
  }
}
