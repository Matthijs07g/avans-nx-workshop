import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser, Roles } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Neo4jService } from "nest-neo4j/dist";

@Injectable()
export class UserService {
    TAG = 'Userservice';

    constructor(private readonly neo4jService: Neo4jService){}

    async getAll() {
        Logger.log('getAll', this.TAG);
       const query = `match(user:User) return user`;
       const result = await this.neo4jService.read(query,{});
       Logger.log(`result: ${JSON.stringify(result)}`);
       return result?.records;
    }

    async getOne(id: string) {
        Logger.log(`getOne(${id})`, this.TAG);
        const query = `match(n) where n.Id = $id return n`;
        const result = await this.neo4jService.write(query,{id:id})
        return result
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    async create(newUser: Pick<IUser, 'firstName' | 'lastName' | 'picture' | 'emailadres' | 'birthdate' | 'pass' >) {
        Logger.log('create', this.TAG);
        const query = `merge(user:User {Id: $id})
                        on create set 
                            user.firstName = $firstName,
                            user.lastName = $lastName, 
                            user.picture = $picture,
                            user.emailadres = $emailadres,
                            user.birthdate = $birthdate,
                            user.role = $role,
                            user.pass = $pass,
                            user.friends = $friends,
                            user.blogs = $blogs,
                        on match set 
                            user.firstName = $firstName,
                            user.lastName = $lastName, 
                            user.picture = $picture,
                            user.emailadres = $emailadres,
                            user.birthdate = $birthdate,
                            user.role = $role,
                            user.pass = $pass,
                            user.friends = $friends,
                            user.blogs = $blogs,   
                        return user
        `;
        const result = await this.neo4jService.write(
            query,
            {
                id: Math.floor(Math.random() * 10000),
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                picture: newUser.picture,
                emailadres: newUser.emailadres,
                birthdate: newUser.birthdate,
                role : Roles.Guest,
                pass : newUser.pass,
                friends: [],
                blogs : []
            });
            Logger.log(`result:${JSON.stringify(result)}`);
            return result;
    }

    async update(id: string, user: Pick<IUser, 'firstName' | 'lastName' | 'picture' | 'emailadres' | 'pass' | 'birthdate' | 'role' >){
        Logger.log(`Update(${id})`, this.TAG);
        const query = ``;
        const result = await this.neo4jService.write(query,{id:id, user:user})
    }

    async delete(id: string){
        Logger.log(`Delete(${id})`, this.TAG);
        const query = `match(n) where n.Id = $id detach delete n`;
        const result = await this.neo4jService.write(query,{id:id})
        return true;
    }
}

