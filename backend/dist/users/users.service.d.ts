import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private users;
    constructor(users: Repository<User>);
    findByUsername(username: string): Promise<User | null>;
    findOne(id: number): Promise<User | null>;
    create(dto: {
        username: string;
        password: string;
    }): Promise<User>;
}
