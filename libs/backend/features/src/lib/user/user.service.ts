import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser, Roles } from '@avans-nx-workshop/shared/api';
import { BehaviorSubject } from 'rxjs';
import { Logger } from '@nestjs/common';

@Injectable()
export class UserService {
    TAG = 'Userservice';

    private users$ = new BehaviorSubject<IUser[]>([
        {
            id: '0',
            firstName: 'Peter',
            lastName: 'Jansen',
            picture: 'data:image/jpeg;base64,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',
            emailadres: 'peterjansen@gmail.com',
            birthdate: '4-3-1999',
            role: Roles.Admin,
            friends: [],
            pass: 'test2113'
        },
        {
            id: '1',
            firstName: 'Paul',
            lastName: 'Elst',
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/640px-Outdoors-man-portrait_%28cropped%29.jpg',
            emailadres: 'paulelst@gmail.com',
            birthdate: '27-4-2004',
            role: Roles.Guest,
            friends: [],
            pass: '1234test'
        },
        {
            id: '2',
            firstName: 'Pieter',
            lastName: 'van Hoorn',
            picture: 'https://www.thoughtco.com/thmb/FXKCnWCLxMxl9c9gkHyNco5Kj5g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/good-looking-man-with-big-beard-56688bcf3df78ce1611f7ba8.jpg',
            emailadres: 'pieterhoorn@gmail.com',
            birthdate: '1-12-1996',
            role: Roles.Owner,
            friends: [],
            pass: '1234567890'
        },
        {
            id: '3',
            firstName: 'Henk',
            lastName: 'de Jong',
            picture: 'https://img.freepik.com/vrije-photo/jonge-bebaarde-man-met-gestreept-overhemd_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699660800&semt=sph',
            emailadres: 'jonghenk@gmail.com',
            birthdate: '1-1-2000',
            role: Roles.Guest,
            friends: [],
            pass: 'test1234'
        },
        {
            id: '4',
            firstName: 'Gerrit',
            lastName: 'Klaassen',
            picture: 'https://t4.ftcdn.net/jpg/03/26/98/51/360_F_326985142_1aaKcEjMQW6ULp6oI9MYuv8lN9f8sFmj.jpg',
            emailadres: 'gerrit123@gmail.com',
            birthdate: '20-11-2002',
            role: Roles.Admin,
            friends: [],
            pass: 'testtest'
        },
    ]);

    getAll(): IUser[] {
        Logger.log('getAll', this.TAG);
        return this.users$.value;
    }

    getOne(id: string): IUser {
        Logger.log(`getOne(${id})`, this.TAG);
        const user = this.users$.value.find((td) => td.id === id);
        if (!user) {
            throw new NotFoundException(`User could not be found!`);
        }
        return user;
    }

    /**
     * Update the arg signature to match the DTO, but keep the
     * return signature - we still want to respond with the complete
     * object
     */
    create(user: Pick<IUser, 'firstName' | 'lastName' | 'picture' | 'emailadres' | 'pass' | 'birthdate' >): IUser {
        Logger.log('create', this.TAG);
        const current = this.users$.value;
        // Use the incoming data, a randomized ID, and a default value of `false` to create the new to-do
        const newUser: IUser = {
            id: `user-${Math.floor(Math.random() * 10000)}`,
            ...user,
            role: Roles.Guest,
            friends: []
        };
        this.users$.next([...current, newUser]);
        return newUser;
    }

    update(id: string, user: Pick<IUser, 'firstName' | 'lastName' | 'picture' | 'emailadres' | 'pass' | 'birthdate' | 'role' >): IUser {
        Logger.log(`Update(${id})`, this.TAG);
        let check = null
        const current = this.users$.value;
        const newUser: IUser = {
            id: id,
            ...user,
            friends: []
        };
        current.forEach(user => {
            if(user.id == newUser.id){
                 user.firstName = newUser.firstName;
                 user.lastName = newUser.lastName;
                 user.picture = newUser.picture;
                 user.emailadres = newUser.emailadres;
                 user.pass = newUser.pass;
                 user.birthdate = newUser.birthdate;
                 user.role = newUser.role;
                check = user
            }
        });
        if(!check){
            throw new NotFoundException('User not found')
        }
        return newUser;
    }

    delete(id: string): IUser{
        Logger.log(`Delete(${id})`, this.TAG);
        console.log(id)
        const user = this.users$.value.find((td) => td.id === id);
        if (!user) {
            throw new NotFoundException(`User could not be found!`);
        }
        const users = this.users$.value
        const updatedCircuits = users.filter(user => user.id !== id);
        this.users$.next(updatedCircuits);
        return user; 
    }
}

