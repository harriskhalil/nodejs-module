import { CreateUserDto } from '../../users/dto/user.dto';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
export class SignUpDto extends CreateUserDto {}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
