import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async create(user: User) {
    const conflictual = await this.findOne(user.username);
    if (conflictual) {
      throw new ConflictException();
    }
    user.userId = this.users.length;
    this.users.push(user);
    const { password, ...result } = user;
    return result;
  }
}
