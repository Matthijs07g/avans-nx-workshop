import { Injectable } from '@nestjs/common';
import { IBlog } from '@avans-nx-workshop/shared/api';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDocument, Blog as BlogModel } from './blog.schema';
import { UpdateBlogDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class BlogService {
    TAG = 'BlogService';

    constructor(
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

    async getByOwnerId(id:string):Promise<IBlog[] | null>{
        Logger.log(`getOneByOwnerId(${id})`, this.TAG);
        const blog = await this.blogModel.find({owner:id});
        if(!blog){
            Logger.debug('Blog not found');
        }
        return blog;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    async create(req: any): Promise<IBlog | null> {
        Logger.log('create', this.TAG);

        Logger.log('Request body:', JSON.stringify(req.body || req, null, 2));
        
        const blog = req.body;
    
        if(blog){
            Logger.log(`Create Blog ${blog.title} about ${blog.subjectType}: ${blog.subjectId}`);
            const createdItem = {
                ...blog,
                owner: req.user._id, 
                datePosted: new Date().toLocaleDateString('nl-NL'),
            };
            return this.blogModel.create(createdItem);
        }
        return null;
    }
    
    async update(_id: string, blog: UpdateBlogDto): Promise<IBlog | null> {
        Logger.log(`Update Blog ${_id}`, this.TAG);
        return this.blogModel.findByIdAndUpdate(
            { _id }, 
            { 
                title: blog.title,
                subjectType: blog.subjectType,
                subjectId: blog.subjectId,
                content: blog.content
            },
            { new: true }
        );
    }

    async delete(_id: string): Promise<IBlog | null> {
        Logger.log(`Delete Blog ${_id}`, this.TAG);
        await this.blogModel.findByIdAndDelete(_id).exec();
        return  null;
    }

    // async getRecommendations(_Id: string): Promise<IBlog[] | null> {
    //     Logger.log(`Get Recommendations(${_Id})`);
    
    //     const query = `MATCH (user:User{id:$id})-[IS_FRIENDS_WITH]->(friend:User) RETURN friend`;
    //     const result = await this.neo4jService.read(query, { id: _Id });
    //     Logger.log(`Friends: ${JSON.stringify(result)}`);
    
    //     const friendId: any[] = [];
    //     const recBlogs: IBlog[] = [];
    
    //     (await result).records.forEach((element) => {
    //         console.log(element.get('friend').properties.id);
    //         friendId.push(element.get('friend').properties.id);
    //     });
    
    //     const recBlogsPromises: Promise<IBlog[] | null>[] = friendId.map(async (element) => {
    //         const blogs = await this.getByOwnerId(element);
    //         return blogs;
    //     });
    
    //     const allBlogs = await Promise.all(recBlogsPromises);
    
    //     allBlogs.forEach((blogs) => {
    //         if (blogs) {
    //             recBlogs.push(...blogs);
    //         }
    //     });
    
    //     return recBlogs.length > 0 ? recBlogs : null;
    // }
    
}
