import { Injectable, Logger } from '@nestjs/common';
import {
    ConflictException,
    UnauthorizedException
} from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { JwtService } from '@nestjs/jwt';
import { IUser, IUserCredentials, IUserIdentity } from '@avans-nx-workshop/shared/api';
import { CreateUserDto } from '@avans-nx-workshop/backend/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User as UserModel } from '../user/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    //
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
        private userService: UserService
    ) {}

    async validateUser(credentials: IUserCredentials): Promise<any> {
        this.logger.log('validateUser');
        const user = await this.userModel.findOne({
            emailadres: credentials.emailadres
        });
        if (user && user.pass === credentials.pass) {
            return user;
        }
        return null;
    }

    async login(credentials: IUserCredentials): Promise<IUserIdentity> {
        if (!credentials || !credentials.emailadres || !credentials.pass) {
            const errMsg = 'Credentials not provided';
            this.logger.debug(errMsg);
            throw new UnauthorizedException(errMsg);
        }

        this.logger.log('login ' + credentials.emailadres);
        return await this.userModel
            .findOne({
                emailadres: credentials.emailadres
            })
            .select('+pass')
            .exec()
            .then((user) => {
                if (user && user.pass === credentials.pass) {
                    const payload = {
                        user_id: user._id
                    };
                    const signedInUser = {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        emailAddress: user.emailadres,
                        profileImgUrl: user.picture,
                        role: user.role,
                        token: this.jwtService.sign(payload)
                    };
                    
                    return signedInUser;
                } else {
                    const errMsg = 'Email not found or password invalid';
                    this.logger.debug(errMsg);
                    throw new UnauthorizedException(errMsg);
                }
            })
            .catch((error) => {
                return error;
            });
    }

    async register(user: CreateUserDto): Promise<IUser | null> {
        this.logger.log(`Register user ${user.firstName} ${user.lastName}`);
        
        if (await this.userModel.findOne({ emailadres: user.emailadres })) {
            this.logger.debug('user exists');
            throw new ConflictException('User already exist');
        }
        this.logger.debug('User not found, creating');
        const createdItem = await this.userService.create(user);
        return createdItem;
    }
}
