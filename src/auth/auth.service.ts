import { Injectable, Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto, SignUpDto } from './dto/auth.dto';
import type { Validator } from './interfaces/validator.interface';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import type { MatchPassword } from './interfaces/match-password.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private jwtService: JwtService,
    @Inject('USER_EXISTENCE_VALIDATOR')
    private readonly userExistenceValidator: Validator<{ user: User | null }>,
    @Inject('PASSWORD_VALIDATOR')
    private readonly passwordValidator: Validator<MatchPassword>,
  ) {}
  async signUp(user: SignUpDto) {
    return await this.userService.create(user);
  }

  async login(user: LoginDto) {
    const dbUser = await this.userService.findOneBy({
      email: user.email,
    });
    await this.userExistenceValidator.validate({ user: dbUser });
    await this.passwordValidator.validate({
      plain: user.password,
      hashed: dbUser?.password ?? '',
    });
    const payload = { sub: dbUser?.id, email: dbUser?.email };
    return {
      user: dbUser,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
