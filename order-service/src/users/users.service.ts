import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './users.repository';
import { generateAccessToken } from 'src/commons/common.auth';
import { IUsers } from './users.entity';
@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userData: CreateUserDto): Promise<any> {
    const findUser: IUsers = await this.userRepository.findOne(userData.email);

    if (findUser) {
      throw new ConflictException();
    }
    const salt = await bcrypt.genSalt(10);
    const encypted_password = await bcrypt.hash(userData.password, salt);
    userData.password = encypted_password;
    const user: IUsers = await this.userRepository.create(userData);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user['_doc'];
    return result;
  }

  async loginUser(loginUser: LoginUserDto): Promise<any> {
    const findUser: IUsers = await this.userRepository.findOne(loginUser.email);
    if (!findUser) {
      throw new NotFoundException();
    }
    const checkPassword = await bcrypt.compare(
      loginUser.password,
      findUser.password,
    );
    if (!checkPassword) {
      throw new UnauthorizedException();
    }
    const token = generateAccessToken(findUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = findUser['_doc'];
    return {
      accessToken: token,
      user,
    };
  }
}
