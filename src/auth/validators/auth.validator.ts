import { UnauthorizedException, Injectable } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { HashService } from '../../common/hash-service';
import type { MatchPassword } from '../interfaces/match-password.interface';
import type { Validator } from '../interfaces/validator.interface';

@Injectable()
export class UserExistenceValidator
  implements Validator<{ user: User | null }>
{
  validate({ user }: { user: User | null }): boolean {
    if (user) {
      return true;
    }
    throw new UnauthorizedException('Invalid Credentials');
  }
}

@Injectable()
export class PasswordValidator implements Validator<MatchPassword> {
  async validate({ plain, hashed }: MatchPassword): Promise<boolean> {
    const result = await HashService.compare(plain, hashed);
    if (result) {
      return true;
    }
    throw new UnauthorizedException('Invalid Credentials');
  }
}
