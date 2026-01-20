import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { IBlog } from '@avans-nx-workshop/shared/api';
import { UpdateBlogDto } from '@avans-nx-workshop/backend/dto';
import { CreateBlogDto } from '@avans-nx-workshop/backend/dto';
import { AuthGuard } from '../auth/auth.guards';

@Controller('blog')
export class BlogController {
    
    constructor(private blogService: BlogService) {}

  @Get('')
  getAll(): Promise<IBlog[]> {
    return this.blogService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<IBlog | null> {
    return this.blogService.getOne(id);
  }

  // @Get(':id/recommendations')
  // getRecommendations(@Param('id') id: string) : Promise<IBlog[] | null>{
  //   return this.blogService.getRecommendations(id);
  // }
  

  @Post('')
  @UseGuards(AuthGuard)
  create(@Request() req: any): Promise<IBlog | null> {
    return this.blogService.create(req);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() data: UpdateBlogDto, @Request() req: any): Promise<IBlog | null> {
    return this.blogService.update(id, data, req.user.user_id)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  del(@Param('id') id:string, @Request() req: any){
    return this.blogService.delete(id, req.user.user_id);
  }

}
