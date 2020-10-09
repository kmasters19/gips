import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../auth/dtos/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>
  ) {}

  async findOne(id: string) {
    return this.userRepo.findOne(id);
  }

  async findByUsername(username: string) {
    return this.userRepo.findOne({ username });
  }

  async createUser(payload: LoginDto): Promise<UserEntity> {
    const exists = await this.findByUsername(payload.clientId);
    if (exists) {
      return exists;
    }
    this.logger.log('Creating User: ');
    this.logger.log(payload);
    const user = this.userRepo.create({
      username: payload.clientId,
      password: payload.password
    });
    return this.userRepo.save(user);
  }
}
