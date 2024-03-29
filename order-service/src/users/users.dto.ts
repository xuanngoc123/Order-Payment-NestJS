import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  userName: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
