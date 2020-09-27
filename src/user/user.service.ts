import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel
      .find({}, { password: 0 })
      .populate({
        path: 'albums',
        select: '_id',
        populate: {
          path: 'photos',
          select: '_id',
        },
      })
      .exec();
    return users;
  }
}
