import { AuthService } from './auth.service';
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    signup(dto: {
        username: string;
        password: string;
    }): Promise<import("../users/user.entity").User>;
    login(dto: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
}
