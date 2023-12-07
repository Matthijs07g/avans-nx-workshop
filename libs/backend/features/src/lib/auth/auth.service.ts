import { Injectable, Logger } from '@nestjs/common';
import {
    ConflictException,
    UnauthorizedException
} from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { JwtService } from '@nestjs/jwt';
import { IUserCredentials, IUserIdentity } from '@avans-nx-workshop/shared/api';
import { CreateUserDto } from '@avans-nx-workshop/backend/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User as UserModel } from '../user/user.schema';

@Injectable()
export class AuthService {
    //
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) {}

    async validateUser(credentials: IUserCredentials): Promise<any> {
        this.logger.log('validateUser');
        const user = await this.userModel.findOne({
            emailAddress: credentials.emailadress
        });
        if (user && user.pass === credentials.pass) {
            return user;
        }
        return null;
    }

    async login(credentials: IUserCredentials): Promise<IUserIdentity> {
        this.logger.log('login ' + credentials.emailadress);
        return await this.userModel
            .findOne({
                emailAddress: credentials.emailadress
            })
            .select('+pass')
            .exec()
            .then((user) => {
                if (user && user.pass === credentials.pass) {
                    const payload = {
                        user_id: user._id
                    };
                    return {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        emailAddress: user.emailadres,
                        profileImgUrl: user.picture,
                        token: this.jwtService.sign(payload)
                    };
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

    async register(user: CreateUserDto): Promise<IUserIdentity> {
        this.logger.log(`Register user ${user.firstName} ${user.lastName}`);
        if (await this.userModel.findOne({ emailadres: user.emailadres })) {
            this.logger.debug('user exists');
            throw new ConflictException('User already exist');
        }
        this.logger.debug('User not found, creating');
        const createdItem = await this.userModel.create(user);
        return createdItem;
    }
}
