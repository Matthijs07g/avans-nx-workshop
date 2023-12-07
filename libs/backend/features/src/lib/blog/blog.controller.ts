import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { BlogService } from './blog.service';
import { IBlog } from '@avans-nx-workshop/shared/api';
import { UpdateBlogDto } from '@avans-nx-workshop/backend/dto';

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

  @Get(':id/recommendations')
  getRecommendations(@Param('id') id: string) : Promise<IBlog[] | null>{
    return this.blogService.getRecommendations(id);
  }
  

  @Post('')
  create(@Request() req : any): Promise<IBlog | null> {
    return this.blogService.create(req);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateBlogDto): Promise<IBlog | null> {
    return this.blogService.update(id, data)
  }

  @Delete(':id')
  del(@Param('id') id:string){
    return this.blogService.delete(id);
  }

}
