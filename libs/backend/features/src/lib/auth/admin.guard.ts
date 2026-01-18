import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
    Logger
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
    private readonly logger = new Logger(AdminGuard.name);

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request['user'];
        
        if (!user) {
            this.logger.warn('No user found in request');
            throw new ForbiddenException('No user information found');
        }

        if (user.role !== 'Admin') {
            this.logger.warn(`User ${user.sub} attempted admin action with role: ${user.role}`);
            throw new ForbiddenException('Admin access required');
        }

        this.logger.log(`Admin action allowed for user: ${user.sub}`);
        return true;
    }
}