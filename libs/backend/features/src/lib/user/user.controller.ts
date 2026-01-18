import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from '@avans-nx-workshop/shared/api';
import { CreateUserDto, UpdateUserDto } from '@avans-nx-workshop/backend/dto';
import { Public } from '../auth/decorators/decorators';
import { AdminGuard } from '../auth/admin.guard';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

  @UseGuards(AdminGuard)
  @Get('')
  getAll() {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string):Promise<IUser | null>{
    return this.userService.getOne(id);
  }

  // @Get(':id/friends')
  // getFriends(@Param('id') id: string):Promise<IUser[] | null>{
  //   return this.userService.getFriends(id)
  // }

  @UseGuards(AdminGuard)
  @Post('')
  create(@Request() req: any): Promise<IUser | null>{
    return this.userService.create(req);
  }

  // @Post(':id')
  // addFriends(@Param('id') id:string, @Request() req: any){
  //   return this.userService.addFriend(id, req);
  // }

  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id:string, @Body() data: UpdateUserDto): Promise<IUser | null>{
    return this.userService.update(id, data);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  del(@Param('id') id:string) {
    return this.userService.delete(id)
  }
}
