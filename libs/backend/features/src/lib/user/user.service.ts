import { Injectable, NotFoundException } from '@nestjs/common';
import { IBlog, IUser, Roles } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject, delay } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Neo4jService } from "nest-neo4j/dist";
import { Model, mongo } from 'mongoose';
import { UserDocument, User as UserModel } from '../user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateUserDto } from '@avans-nx-workshop/backend/dto';
import { JsonPipe } from '@angular/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    TAG = 'Userservice';

    constructor(
        private readonly neo4jService: Neo4jService, 
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>
        ){}

    async getAll(): Promise<IUser[]> {
        Logger.log('getAll', this.TAG);
       const items = await this.userModel
            .find()
            .exec();
        // const query = `match(n) return n`;
        // const result = this.neo4jService.read(query,{});
        // const test : any[] = [];
        // const test3 = (await result).records.forEach(element => {test.push(element.get('n').properties.id)});
        return items;
    }

    async getOne(_id: string): Promise<IUser | null> {
        Logger.log(`getOne(${_id})`, this.TAG);
        // const query = `match(n) where n.Id = $id return n`;
        // const result = await this.neo4jService.write(query,{id:id})
        console.log(_id)
        const item = await this.userModel.findOne({ _id }).exec();
        if(!item){
            Logger.debug('User not found');
        }
        return item;
    }

    async getFriends(_Id: string): Promise<IUser[]>{
        Logger.log(`getFriends(${_Id})`, this.TAG)
        //look up Id op friends neo4j
        const query = `match(user:User{id:$id})-[IS_FRIENDS_WITH]->(friend:User) return friend`
        const result = this.neo4jService.read(query,{id: _Id});
        const friendId : any[] = [];
        (await result).records.forEach(element => {friendId.push(element.get('friend').properties.id)});
        //look up user based on previous result mongoose
        const friends : IUser[] = [];
        friendId.forEach( async element =>{
            console.log(element)
            const item = await this.getOne(element);
            console.log(item)
            if(item){
                friends.push(item)
            }
        })
        console.log('done')
        return friends;
        
    }

    async create(req: any): Promise<IUser | null> {
        Logger.log('create', this.TAG);


        const user = req.body;
        let mongoUser;
        //const Team_id = req.Team.Team_id     for authorisatie

        if(user){
            Logger.log(`Create User ${user.firstName} ${user.lastName}`);
            const createdItem = {
                ...user
            };
            mongoUser = this.userModel.create(createdItem);
            if(await mongoUser){
                
                const query = `CREATE (user:User{id:$_Id})`;
                const result = await this.neo4jService.write(query,{_Id : `${(await mongoUser)._id}`});
                Logger.log(`result:${JSON.stringify(result)}`);
            }

            return mongoUser;
        }
        return null;
    }

    async update(_id: string, user: UpdateUserDto): Promise<IUser | null>{
        Logger.log(`Update(${_id})`, this.TAG);
        return this.userModel.findByIdAndUpdate({ _id }, user);
    }

    async delete(_id: string){
        Logger.log(`Delete(${_id})`, this.TAG);
        return this.userModel.findByIdAndDelete({_id});
    }

    async addFriend(userId: string, req: any){
        const request = req.body;
        const newFriendId = request.otherId
        if(userId != newFriendId){
            Logger.log(`${userId} added ${newFriendId} as friend`, this.TAG);
            const query = `MATCH (user:User {id: $userId})
                           MATCH (newFriend:User {id: $newFriendId})
                           CREATE (user)-[rel:IS_FRIENDS_WITH]->(newFriend)`;
            const result = await this.neo4jService.write(query,{userId:userId, newFriendId:newFriendId});
            return true;
        }
        Logger.log(`${userId} wanted to friend himself`, this.TAG);
        return false;
    }

    async generateHashedPassword(plainTextPassword: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(plainTextPassword, saltOrRounds);
      }
    
      async validatePassword(givenPassword: string, passwordHash: string): Promise<boolean> {
        return await bcrypt.compare(givenPassword, passwordHash);
      }
}

