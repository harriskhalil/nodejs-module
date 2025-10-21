import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  IsDate,
  IsOptional,
} from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { IsUniqueEmail } from '../validators/is-unique-email.validator';
import { Confirmed } from '../validators/consfirm-password.validator';
export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @IsUniqueEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message:
      'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  password: string;

  @IsString()
  status: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;
}

export class CreateUserDto extends UserDto {
  @IsString()
  @IsNotEmpty()
  @Confirmed('password')
  password_confirmation: string;
}

export class UpdateUserDto extends PickType(UserDto, [
  'name',
  'email',
  'phone',
  'updated_at',
] as const) {}
