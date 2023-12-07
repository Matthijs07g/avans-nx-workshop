import { Injectable, NotFoundException } from '@nestjs/common';
import { IBlog } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { error } from 'console';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDocument, Blog as BlogModel } from './blog.schema';
import { UpdateBlogDto } from '@avans-nx-workshop/backend/dto';
import { Neo4jService } from 'nest-neo4j/dist';

@Injectable()
export class BlogService {
    TAG = 'BlogService';

    constructor(
        private readonly neo4jService: Neo4jService, 
        @InjectModel(BlogModel.name) private blogModel: Model<BlogDocument>
    ) {}


    async getAll(): Promise<IBlog[]> {
        Logger.log('getAll', this.TAG);
        const items = await this.blogModel
            .find()
            //.populate('blog', 'name location length mapIMG')  for references
            .exec();
        return items;
    }

    async getOne(_id: string): Promise<IBlog | null> {
        Logger.log(`getOne(${_id})`, this.TAG);
        const item = await this.blogModel.findOne({ _id }).exec();
        if(!item){
            Logger.debug('Blog not found');
        }
        return item;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    async create(req: any): Promise<IBlog | null> {
        Logger.log('create', this.TAG);
        const blog = req.body;
        //const blog_id = req.blog.blog_id     for authorisatie

        if(blog){
            Logger.log(`Create Blog ${blog.title}`);
            const createdItem = {
                ...blog
            };
            return this.blogModel.create(createdItem);
        }
        return null;
    }

    async update(_id: string, blog: UpdateBlogDto): Promise<IBlog | null> {
        Logger.log(`Update Blog (${blog.title})`, this.TAG);
        return this.blogModel.findByIdAndUpdate({ _id }, blog);

    }

    async delete(_id: string){
        Logger.log(`Delete Blog (${_id})`, this.TAG);
        return this.blogModel.findByIdAndDelete({ _id });
    }

    async getRecommendations(_Id: string): Promise<IBlog[] | null>{
        Logger.log(`Get Recommendations(${_Id})`)
        const query = `match(user:User{id:$_Id})<-[IS_FRIENDS_WITH]-(friend:User) return friend`
        const result = this.neo4jService.read(query,{id: _Id});
        Logger.log(`Friends: ${JSON.stringify(result)}`);
        const friendId : any[] = [];
        (await result).records.forEach(element => {friendId.push(element.get('friend').properties.id)});
        const recBlogs : any[] = [];
        friendId.forEach(element =>{
            recBlogs.push(this.blogModel.findOne({element}));
        })
        return recBlogs;
        
    }
}
