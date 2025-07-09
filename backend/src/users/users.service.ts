import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  findByUsername(username: string) {
    return this.users.findOne({ where: { username } });
  }

  findOne(id: number) {
    return this.users.findOne({ where: { id } });
  }

  async create(dto: { username: string; password: string }) {
    const existing = await this.users.findOne({ where: { username: dto.username } });

    if (existing) {
      throw new ConflictException('Username already exists');
    }

    const user = this.users.create(dto);
    return this.users.save(user);
  }
}
