import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './users.dto';
import { IUsers } from './users.entity';
import { User, UserDocument } from './users.schema';
@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<IUsers> {
    return this.userModel.findOne({ email: email });
  }
  async create(userData: CreateUserDto): Promise<IUsers> {
    return this.userModel.create(userData);
  }
}
