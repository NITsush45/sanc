import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private users;
    private jwt;
    constructor(users: UsersService, jwt: JwtService);
    validateUser(username: string, pass: string): Promise<{
        id: number;
        username: string;
    } | null>;
    login(credentials: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    signup(credentials: {
        username: string;
        password: string;
    }): Promise<import("../users/user.entity").User>;
}
