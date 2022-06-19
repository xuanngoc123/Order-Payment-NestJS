import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { STATUS } from 'src/commons/status.code';
import { CreateUserDto, LoginUserDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly userSevice: UsersService) {}

  @Post('register')
  async createUser(@Body() user: CreateUserDto): Promise<any> {
    return this.userSevice.createUser(user);
  }
  @Post('login')
  @HttpCode(STATUS.OK)
  async loginUser(@Body() user: LoginUserDto): Promise<any> {
    return this.userSevice.loginUser(user);
  }
}
